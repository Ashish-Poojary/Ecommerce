import axios from 'axios'
import React, { useState } from 'react'

const ForgotPass = () => {
    const[email,setEmail]=useState('')
    const[status,setStatus]=useState('')

    const handleChange = (e) =>{
        setEmail(e.target.value);
    }

    const SubmitForgotPassword=(e)=>{
        e.preventDefault();
        axios.post("http://localhost:3001/forgotpass",{
         email:email
        
        }).then((response)=>{
          if(response.data.length>0)
          {
            localStorage.setItem('u',email)
            window.location="http://localhost:3000/otp"
          }
          else
          {
            setStatus('Sorry..! Invalid Email')
          }
        }) 
        .catch(error => {
          setStatus('Failed to send OTP. Please try again.')
      }) 
    
      }
    
  return (
    <div className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-lg-5">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h3 className="mb-0">Forgot Password</h3>
            </div>
            <div className="card-body">
              <form onSubmit={SubmitForgotPassword}>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input 
                    type="email" 
                    value={email} 
                    name="email" 
                    className="form-control" 
                    placeholder="Enter your email" 
                    required 
                    onChange={handleChange}
                  /> 
                </div>
                <div className="mb-3">
                  <button type="submit" className="btn btn-success w-100">
                    Send OTP
                  </button>
                </div>
              </form>
              {status && <p className="text-danger">{status}</p>}
              <div className="mt-3">
                <a href="/login" className="text-decoration-none">← Back to Login</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgotPass
