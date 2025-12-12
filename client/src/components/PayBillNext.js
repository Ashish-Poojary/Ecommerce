import React from 'react'
import { useParams} from 'react-router-dom';
import axios from "axios";
import payImage from "../images/credit-card.webp"


let uid=localStorage.getItem('u');
const PayBillNext = () => {
    const {price} = useParams();

    const paymentHandler = async (e) => {
        e.preventDefault();

        var options={
          key:process.env.REACT_APP_RAZORPAY_KEY,
          key_secret:process.env.REACT_APP_RAZORPAY_SECRET,
          amount:price*100,
          currency:"INR",
          name:"Ecommerce",
          description:"Payment for your order",
          handler:function(response){
            const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3001";
            axios.post(`${apiUrl}/paybillnext/${price}`,{
              price:price,
              payment_id:response.razorpay_payment_id,
              uid:uid
             }).then((response)=>{
               alert("Payment successful")
               window.location="/myorder"
             })
             .catch(error => {
                 alert("Payment failed. Please try again.")
             })
          },
          prefill:{
            name:"",
            email:"",
            contact:"",
          },

          notes:{
            address:"Razorpay Corporate Office",
          },
          theme:{
            color: "#686CFD",
          }
        };
        var pay=new window.Razorpay(options);
        pay.open()

       
  };
    
  return (
    <div className="container mt-4 mb-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card">
            <div className="card-body">
              <h2 className="mb-4">Payment</h2>
              <div className="row">
                <div className="col-md-6 mb-4">
                  <h4 className="mb-3">Total Amount: ₹{parseFloat(price || 0).toLocaleString('en-IN')}</h4>
                  <button 
                    onClick={paymentHandler} 
                    className="btn btn-primary btn-lg"
                  >
                    Pay Now
                  </button>
                </div>
                <div className="col-md-6 text-center">
                  <img 
                    src={payImage} 
                    className="img-fluid" 
                    alt="Payment" 
                    style={{ maxHeight: "250px" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PayBillNext
