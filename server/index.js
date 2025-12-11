const express = require('express')
const port = 3001
const app = express()
const mysql = require('mysql')
const multer = require('multer')
const nodemailer=require('nodemailer')

const cors = require('cors');
app.use(cors());
app.use(express.json());


const conn=mysql.createConnection({
    host: 'localhost',
    port: '3306',
    database: 'internship_mca',
    user: 'root',
    password: ''

})

conn.connect(function(err){
    if(err){
        console.log("DB could Not be Connected.")
    }
    else{
        console.log("DB Connected successfully")
    }
})


let today = new Date();
dd = String(today.getDate()).padStart(2, '0');
mm = String(today.getMonth() + 1).padStart(2, '0');
yy = today.getFullYear();
let cdate = yy + "-" + mm + "-" + dd;
let ctime = today.toTimeString().substr(0, 8);


app.post('/feedback',(req,res)=>{
    const {userid,about_product,about_service,comments}=req.body
  
    conn.query("INSERT into feedback(userid,about_product,about_service,comments) values(?,?,?,?)",
        [userid,about_product,about_service,comments],
        (err,result)=>{
            if(err){
                res.status(500).json({ error: "Failed to submit feedback" })
            }
            else
            {
                res.status(200).json({ message: 'Feedback submitted successfully', result })
            }
        }
    ) 

})

app.post('/category', (req,res)=>{ 
    const {category } =req.body 

    conn.query("INSERT INTO category(category) values(?)",
        [category],
        (err,result) =>{
            if(err){
                res.status(500).json({ error: "Failed to add category" })
            }
            else{
                res.status(200).json({ message: 'Category added successfully', result })
            }
        }
    )

})

app.get('/viewcategory', (req,res)=>{
    const q="SELECT * FROM category ORDER BY id DESC"
    conn.query(q,(err,result)=>{
        if(err){
            res.status(500).json({ error: "Database error" })
        }
        else{
            res.send(result)
        }
    })
})

app.delete("/delcategory/:id",(req,res)=>{
    const id=req.params.id
    conn.query("DELETE FROM category WHERE ID =?",[id],(err,result)=>{
        if(err){
            res.status(500).json({ error: "Failed to delete category" })
        }
        else{
            res.status(200).json({ message: "Category deleted successfully", result })
        }
    })
})

app.get('/viewcart', (req,res)=>{
    const q="SELECT * FROM customer_orders"
    conn.query(q,(err,result)=>{
        if(err){
            res.status(500).json({ error: "Database error" })
        }
        else{
            res.send(result)
        }
    })
})


app.get('/orders', (req,res)=>{
    const q = `SELECT 
            co.id, 
            co.user_id, 
            co.pid, 
            co.qty, 
            co.price, 
            co.total, 
            co.order_date, 
            co.order_time, 
            co.order_status, 
            co.payment_status,
            COALESCE(p.product_name, 'Product Deleted') as product_name,
            COALESCE(s.name, co.user_id) as user_name,
            COALESCE(s.email, co.user_id) as user_email
        FROM customer_orders co
        LEFT JOIN products p ON co.pid = p.id
        LEFT JOIN signup s ON co.user_id = s.email
        ORDER BY co.order_date DESC, co.order_time DESC`
        
    conn.query(q, (err,result)=>{
        if(err){
            return res.status(500).json({ error: "Database error" })
        }
        res.status(200).json(result)
    })
})

app.get('/user/name/:email', (req,res)=>{
    const email = req.params.email;
    conn.query("SELECT name FROM signup WHERE email=?", [email], (err, result) => {
        if(err) {
            return res.status(500).json({ error: "Database error" });
        }
        if(result.length > 0) {
            res.json({ name: result[0].name });
        } else {
            res.json({ name: email }); // Fallback to email if name not found
        }
    });
});

app.get('/user/address/:email', (req,res)=>{
    const email = req.params.email;
    conn.query("SELECT name, address, city, pincode, contact FROM signup WHERE email=?", [email], (err, result) => {
        if(err) {
            return res.status(500).json({ error: "Database error" });
        }
        if(result.length > 0) {
            res.json(result[0]);
        } else {
            res.status(404).json({ error: "User not found" });
        }
    });
});

app.get('/admin/stats', (req,res)=>{
    const stats = {}
    
    // Get total users count
    conn.query("SELECT COUNT(*) as count FROM signup", (err, result) => {
        if(err) {
            return res.status(500).json({ error: "Database error" })
        }
        stats.totalUsers = result[0].count
        
        // Get total products count
        conn.query("SELECT COUNT(*) as count FROM products", (err, result) => {
            if(err) {
                console.log(err)
                return res.status(500).json({ error: "Database error" })
            }
            stats.totalProducts = result[0].count
            
            // Get total orders count
            conn.query("SELECT COUNT(*) as count FROM customer_orders", (err, result) => {
                if(err) {
                    console.log(err)
                    return res.status(500).json({ error: "Database error" })
                }
                stats.totalOrders = result[0].count
                
                // Get pending orders count
                conn.query("SELECT COUNT(*) as count FROM customer_orders WHERE order_status='pending'", (err, result) => {
                    if(err) {
                        console.log(err)
                        return res.status(500).json({ error: "Database error" })
                    }
                    stats.pendingOrders = result[0].count
                    
                    // Get total revenue
                    conn.query("SELECT SUM(total) as total FROM customer_orders WHERE payment_status='Paid'", (err, result) => {
                        if(err) {
                            console.log(err)
                            return res.status(500).json({ error: "Database error" })
                        }
                        stats.totalRevenue = result[0].total || 0
                        
                        res.send(stats)
                    })
                })
            })
        })
    })
})


app.get('/viewfeedback',(req,res)=>{
    const q="SELECT * FROM feedback ORDER BY id DESC"
    conn.query(q,(err,result)=>{
        if(err)
        {
            console.log(err)
            res.status(500).json({ error: "Database error" })
        }
        else
        {
            res.send(result)
        }
    })
})

app.delete("/delfeedback/:id",(req,res)=>{
    const id=req.params.id
    conn.query("DELETE from feedback WHERE id = ?",[id],(err,result)=>{
        if(err){
            console.log(err)
            res.status(500).json({ error: "Failed to delete feedback" })
        }
        else{
            res.status(200).json({ message: "Feedback deleted successfully", result })
        }
    })
})




app.post('/signup',(req,res)=>{
    const {name,city,pincode,address,contact,email,password}=req.body
  
    conn.query("SELECT * FROM signup WHERE email=?", [email], (err, checkResult) => {
        if(err){
            return res.status(500).json({ error: "Database error" })
        }
        if(checkResult.length > 0){
            return res.status(400).json({ error: "Email already registered" })
        }
        
        conn.query("INSERT into signup(name,city,pincode,address,contact,email,password) values(?,?,?,?,?,?,?)",
            [name,city,pincode,address,contact,email,password],
            (err,result)=>{
                if(err){
                    return res.status(500).json({ error: "Failed to register user" })
                }
                conn.query("insert into login(username,password,utype)values(?,?,?)",
                    [email,password,'user'], (err, loginResult) => {
                        if(err){
                            return res.status(500).json({ error: "User created but login failed" })
                        }
                        res.status(200).json({ message: 'Registration successful', result })
                    })
            }
        )
    })
})

app.post('/log_auth',(req,res)=>{
    const {username,password}=req.body
    conn.query("SELECT l.*, s.name FROM login l LEFT JOIN signup s ON l.username = s.email WHERE l.username=? and l.password=?",[username,password],
        (err,result)=>{
            if(err)
            {
                console.log(err)
                res.status(500).json({ error: "Database error" })
            }
            else{ 
                res.send(result)
            }
        }
    )
})


let imgconfig = multer.diskStorage({
    destination:(req,file,callback) =>{
        callback(null,"../client/public/upload/");       
    },
    filename:(req,file,callback) =>{
        callback(null,`image-${Date.now()}.${file.originalname}`)
    }
 })

 const isImage = (req,file,callback)=>{
    if(file.mimetype.startsWith("image")){
        callback(null,true)}
    else{
        callback(null,Error("only image is allowed"))}
 }

 let upload = multer({
    storage:imgconfig,
    fileFilter:isImage
 })


app.post('/product', upload.single("file"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "File upload failed. Only images are allowed." });
    }

    const { product_name, category, qty, price, uom, stock } = req.body;
    const { filename } = req.file;

    conn.query(
        "INSERT INTO products(product_name, category, qty, price, uom, image, stock) VALUES(?,?,?,?,?,?,?)",
        [product_name, category, qty, price, uom, filename, stock],
        (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ error: "Database error occurred." });
            } else {
                res.status(200).send(result);
            }
        }
    );
});


app.get('/productview', (req,res)=>{
    const q="SELECT * FROM products ORDER BY id DESC"
    conn.query(q,(err,result)=>{
        if(err){
            res.status(500).json({ error: "Database error" })
        }
        else{
            res.send(result)
        }
    })
})


app.delete("/delproduct/:id",(req,res)=>{
    const id=req.params.id
    conn.query("DELETE FROM products WHERE ID =?",[id],(err,result)=>{
        if(err){
            console.log(err)
            res.status(500).json({ error: "Failed to delete product" })
        }
        else{
            res.status(200).json({ message: "Product deleted successfully", result })
        }
    })
})

app.post('/addcart/:id/:uid',(req,res) => {
    const qty=1
    const id=req.params.id
    const uid=req.params.uid
    const q="select * from products where id=?";
    conn.query(q,[id],(err,result) => {
        if(err){
        console.log(err);}
        else{
            const price=result[0].price
            const total=price
            
            conn.query("insert into customer_orders(user_id,price,qty,total,order_date,order_time,order_status,payment_status,pid)values(?,?,?,?,?,?,?,?,?)",
            [uid,price,qty,total,cdate,ctime,'pending','pending',id])
            res.send(result);
        }
    });
});

app.get('/mycart/:uid',(req,res) => {
    const uid=req.params.uid;
    const q="select a.id,a.pid,a.user_id,a.qty,a.price,a.total,a.order_date,a.order_time,a.order_status,a.payment_status,b.product_name from customer_orders as a join products as b on a.user_id=? and a.pid=b.id where a.order_status IN ('pending', 'Confirmed', 'confirmed') ORDER BY a.order_status ASC, a.order_date DESC";
    conn.query(q,[uid],(err,result) => {
        if(err){
        console.log(err);
        res.status(500).json({ error: "Database error" });
        }
        else{
            res.send(result);}
    });
});

app.delete("/deleteorder/:id",(req,res)=>{
    const id=req.params.id
    conn.query("DELETE FROM customer_orders WHERE ID =?",[id],(err,result)=>{
        if(err){
            console.log(err)
            res.status(500).json({ error: "Failed to delete order" })
        }
        else{
            res.status(200).json({ message: "Order deleted successfully", result })
        }
    })
})

app.post('/paybillnext/:price',(req,res) => {
    const price=req.body.price
    const payment_id=req.body.payment_id
    const uid=req.body.uid
    
    const status='Paid'
    const id=Math.floor(Math.random() * (9999 - 1000 + 1) + 1000)
    const q="update customer_orders set payment_status=?,order_status=? where user_id=? AND order_status='pending'";
    conn.query(q,[status,'Confirmed',uid],(err,result) => {
        if(err){
            return res.status(500).json({ error: "Failed to update payment status" });
        }
        conn.query("insert into payment(order_id,order_amount,payment_date,user_id,transaction_no)values(?,?,?,?,?)",
        [id,price,cdate,uid,payment_id], (err, paymentResult) => {
            if(err) {
                return res.status(500).json({ error: "Payment record failed" });
            }
            res.status(200).json({ message: "Payment successful", result });
        })
    });
});

app.post('/forgotpass',(req,res) => {
    const otp=Math.floor(Math.random() * (9999 - 1000 + 1) + 1000)
    const username=req.body.email
    conn.query("SELECT * from login where username =?",[username],
    (err,result)=> {
        if(err){
            console.log(err);}
        else{
            let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                auth: {
                  user: "ashishpoojary33@gmail.com",
                  pass: "lxinugiwslpwokeq",
                },
              });
            
              transporter.sendMail({
                from: '"Ecommerce" <ashishpoojary33@gmail.com>',
                to: username,
                subject: "ONE TIME PASSWORD",
                text: "Your OTP:",
                html: "<b>OTP: </b>"+otp,
              });
            conn.query("insert into otp(otp,status)values(?,?)",
            [otp,'active'])
           res.send(result); }     
    }
    );
});


app.post('/otp',(req,res) => {
    const otp=req.body.otp
    conn.query("SELECT * from otp where otp =?",[otp],
    (err,result)=> {
        if(err){
            return res.status(500).json({ error: "Database error" })
        }
        res.send(result)
    }
    );
});


app.post('/resetpass',(req,res) => {
    const newpass=req.body.newpass
    const confirmpass=req.body.confirmpass
    const uid=req.body.uid

        conn.query("update login set password=? where username =?",[newpass,uid],
    (err,result)=> {
        if(err){
            console.log(err);}
        else{
           res.send(result); }     
    }
    ); 
   
});





app.listen(port,()=>{
    console.log(`Server Started on port ${port}`)

})

app.get("/",(req,res) => {
    res.send("Ecommerce API Server");
});