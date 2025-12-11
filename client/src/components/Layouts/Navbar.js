import React from 'react'
import { useNavigate } from 'react-router-dom';

let utype=localStorage.getItem('utype')

const Navbar = () => {
  const navigate=useNavigate()
  const logout=()=>{
      localStorage.clear();
      navigate('/login')
      window.location.reload()
      // window.location='http://localhost3000/login'
}
    if(utype==="user")
        {
            return(
                <div>
                    <nav className='navbar navbar-expand-sm bg-dark navbar-dark'>
                        <div className='container-fluid'>
                            <ul className='navbar-nav'>
                                <li> <a href='/userhome' className='nav-link'> Home </a></li>
                                <li> <a href='/mycart' className='nav-link'>My Cart </a></li>
                                <li> <a href='/feedback' className='nav-link'> Feedback </a></li>
                                <li> <button className='btn btn-danger' onClick={logout}>Logout</button></li>
                            </ul>
                        </div>
                    </nav>
                </div>
            )}
    else if(utype==="admin")
        {
            return(
                <div>
                    <nav className='navbar navbar-expand-sm bg-dark navbar-dark'>
                        <div className='container-fluid'>
                            <ul className='navbar-nav'>
                                <li> <a href='/adminhome' className='nav-link'>Home</a></li>

                                <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown">Category</a>
                                    <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="/category">Create Category</a></li>
                                    <li><a className="dropdown-item" href="/categoryview">View Category</a></li>

                                    </ul>
                                </li>

                                <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown">Product</a>
                                    <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="/product">Create Product</a></li>
                                    <li><a className="dropdown-item" href="/productview">View Product</a></li>

                                    </ul>
                                </li>

                                <li> <a href='/orders' className='nav-link'> Orders </a></li>
                                <li> <a href='/feedbackview' className='nav-link'> Feedback </a></li>
                                <li> <button className='btn btn-danger' onClick={logout}>Logout</button></li>
                            </ul>
                        </div>
                    </nav>
                </div>
            )
        }
    else
    {
        return (
            <div>
                <nav className='navbar navbar-expand-sm navbar-dark bg-dark'>
                    <div className='container-fluid'>
                        <span className='navbar-text text-warning fs-2'> 
                            Ecommerce </span>
                        <ul className='navbar-nav'>
                            <li> <a href='/home' className='nav-link'> Home </a></li>
                            <li> <a href='/feedback' className='nav-link'> Feedback </a></li>
                            <li> <a href='/signup' className='nav-link'> SignUp </a></li>
                            <li> <a href='/login' className='nav-link'> Login </a></li> 
                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
}

export default Navbar