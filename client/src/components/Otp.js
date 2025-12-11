import axios from 'axios'
import React, { useState } from 'react'

const Otp = () => {
    const[otp,setOtp]=useState('')
    const[status,setStatus]=useState('')

    const handleChange = (e) =>{
        setOtp(e.target.value);
    }

    const SubmitOtp=(e)=>{
        e.preventDefault();
        axios.post("http://localhost:3001/otp",{
         otp:otp
        
        }).then((response)=>{
          if(response.data.length>0)
          {
           
            window.location="http://localhost:3000/resetpass"
          }
          else
          {
            setStatus('Sorry..! Invalid Otp')
          }
        }) 
        .catch(error => {
          setStatus('OTP verification failed. Please try again.')
      }) 
    
      }
    
  return (
    <div className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-lg-5">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h3 className="mb-0">OTP Verification</h3>
            </div>
            <div className="card-body">
              <form onSubmit={SubmitOtp}>
                <div className="mb-3">
                  <label className="form-label">Enter OTP</label>
                  <input 
                    type="number" 
                    value={otp} 
                    name="otp" 
                    className="form-control" 
                    placeholder="Enter your OTP" 
                    required 
                    onChange={handleChange}
                  /> 
                </div>
                <div className="mb-3">
                  <button type="submit" className="btn btn-success w-100">
                    Verify OTP
                  </button>
                </div>
              </form>
              {status && <p className="text-danger">{status}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Otp
