import React, { useState } from 'react';
import login from "../images/login.jpg"
import axios from 'axios'

const Login = () => {
  const [FormData,setFormData] = useState({username:"",password:""})
  const [logStatus,setLogStatus] = useState('')
  
  const handleChange = (e) =>{
      const {name,value} = e.target
      setFormData({...FormData,[name]:value})
  }
  const FormLogin=(e)=>{

    e.preventDefault()
    axios.post('http://localhost:3001/log_auth',FormData)
        .then((response)=>{
        if(response.data.length>0)
        {
            let utype=response.data[0].utype
            let uname=response.data[0].username
            let userName=response.data[0].name || uname // Use name if available, otherwise use email
            localStorage.setItem('u',uname)
            localStorage.setItem('utype',utype)
            localStorage.setItem('userName',userName) // Store user's name
            if(utype==="user")
            {
                window.location="http://localhost:3000/userhome"
            }

            if(utype==="admin")
                {
                    window.location="http://localhost:3000/adminhome"
                }  
        }
        else
        {
            setLogStatus("Sorry..! Failed to Login.")
        }
    })
    .catch(error=>{
        setLogStatus("Login failed. Please try again.")
    })
}
  return (
    <div className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="row">
            <div className="col-lg-6 mb-4">
              <h2 className="mb-4">Login</h2>
              <form onSubmit={FormLogin}>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input 
                    type="email" 
                    name="username" 
                    className="form-control" 
                    required 
                    value={FormData.username} 
                    onChange={handleChange}
                    placeholder="Enter your email"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input 
                    type="password" 
                    name="password" 
                    className="form-control" 
                    required 
                    value={FormData.password} 
                    onChange={handleChange}
                    placeholder="Enter your password"
                  />
                </div>

                <div className="mb-3">
                  <a href="/forgotpass" className="text-decoration-none">Forgot Password?</a>
                </div>

                <div className="mb-3">
                  <button className="btn btn-success w-100" type="submit">Login</button>
                </div>
              </form>
              {logStatus && <p className="text-danger">{logStatus}</p>}
            </div>
            <div className="col-lg-6 text-center">
              <img src={login} alt="Login" className="img-fluid rounded" style={{ maxHeight: "400px" }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login