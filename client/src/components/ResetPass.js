import axios from 'axios'
import React, { useState } from 'react'

const uid=localStorage.getItem('u')
const ResetPass = () => {
    const[newpass,setNewpass]=useState('')
    const[confirmpass,setConfirmpass]=useState('')
  

    const handleChange = (e) =>{
        setNewpass(e.target.value);  
    }

    const ResethandleChange = (e) =>{
      setConfirmpass(e.target.value);  
  }

    const ResetFormSubmit=(e)=>{
        e.preventDefault();
        if(newpass===confirmpass)
        {
        axios.post("http://localhost:3001/resetpass",{
         newpass:newpass,
         confirmpass:confirmpass,
         uid:uid
        
        }).then((response)=>{
          window.location="http://localhost:3000/login"
        }) 
        .catch(error => {
          alert("Failed to reset password. Please try again.")
      }) 

       }

       else
       {
         alert("New password and confirm password must be same")
       }
    
      }
    
  return (
    <div className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-lg-5">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h3 className="mb-0">Reset Password</h3>
            </div>
            <div className="card-body">
              <form onSubmit={ResetFormSubmit}>
                <div className="mb-3">
                  <label className="form-label">New Password</label>
                  <input 
                    type="password" 
                    value={newpass} 
                    name="newpass" 
                    className="form-control" 
                    placeholder="Enter your new password" 
                    required 
                    onChange={handleChange}
                  /> 
                </div>
                <div className="mb-3">
                  <label className="form-label">Confirm Password</label>
                  <input 
                    type="password" 
                    value={confirmpass} 
                    name="confirmpass" 
                    className="form-control" 
                    placeholder="Confirm your password" 
                    required 
                    onChange={ResethandleChange}
                  /> 
                </div>
                <div className="mb-3">
                  <button type="submit" className="btn btn-success w-100">
                    Reset Password
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResetPass
