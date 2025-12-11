import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import Login from './components/Login.js'
import Category from './components/Category.js'
import Feedback from './components/Feedback.js'
import Payment from './components/Payment.js'
import Navbar from './components/Layouts/Navbar.js'
import Product from './components/Product.js'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Footer from './components/Layouts/Footer.js'
import Home from './components/Home.js'
import FeedbackView from './components/FeedbackView.js'
import Signup from './components/Signup.js'
import Userhome from './components/Userhome.js'
import Adminhome from './components/Adminhome.js'
import ProductView from './components/ProductView.js'
import CategoryView from './components/CategoryView.js'
import Otp from './components/Otp.js'
import ResetPass from './components/ResetPass.js'
import ForgotPass from './components/ForgotPass.js'
import MyCart from './components/MyCart.js'
import PayBillNext from './components/PayBillNext.js'
import Orders from './components/Orders.js'

function App() {
  return (
    <Router>
    <div className="App">
      <Navbar></Navbar>

      <Routes>
        <Route path='/home' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/category' element={<Category/>}/>
        <Route path='/payment' element={<Payment/>}/>
        <Route path='/product' element={<Product/>}/>
        <Route path='/feedback' element={<Feedback/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/userhome' element={<Userhome/>}/>
        <Route path='/adminhome' element={<Adminhome/>}/>
        <Route path='/feedbackview' element={<FeedbackView/>}/>
        <Route path='/productview' element={<ProductView/>}/>
        <Route path='/categoryview' element={<CategoryView/>}/>
        <Route path='/forgotpass' element={<ForgotPass/>}/>
        <Route path='/otp' element={<Otp/>}/>
        <Route path='/resetpass' element={<ResetPass/>}/>
        <Route path='/mycart' element={<MyCart/>}/>
        <Route path='/paybill_next/:price' element={<PayBillNext/>}/>
        <Route path='/orders' element={<Orders/>}/>
      </Routes>

      <Footer></Footer>
    </div>
    </Router>
  );
}

export default App;



