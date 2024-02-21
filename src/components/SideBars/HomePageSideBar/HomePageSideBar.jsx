import React from 'react'
import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {AuthContext} from '../../../context/AuthContext'
import './HomePageSideBar.css'
const HomePageSideBar = () => {
    const {isAuthenticated} = useContext(AuthContext);
    const navigate = useNavigate();
    const handleLogoClick = (e) => {
        e.preventDefault();
        
    }
  return (
    <div className='side-bar-container'>
        <div className="side-bar-upper-part" onClick={(e)=>handleLogoClick(e)}>
            <img src="src\assets\icons8-human-resources-64.png" alt="logo" /><span>MUSKETEERS HMRS</span>
        </div>
        <div className='side-bar-inner-body'>
            {/* {isAuthenticated.role === null} &&  */}
            <Link to="/admin-login"><button>Admin Login</button></Link>
            <Link to="/login">
                <button>Login</button>
              </Link>
              <Link to="/register-page">
                <button>Register</button>
              </Link>
            
            {/* ((isAuthenticated && {isAuthenticated.role==='GUEST'}) &&
            <Link>GuestPage</Link>
            )
            ((isAuthenticated && {isAuthenticated.role==='PERSONNEL'}) &&
            <Link>PersonnelPage</Link>
            )
            ((isAuthenticated && {isAuthenticated.role==='SUPERVISOR'}) &&
            <Link>SupervisorPage</Link>
            )
            ((isAuthenticated && {isAuthenticated.role==='ADMIN'}) &&
            <Link>AdminPage</Link>
            ) */}
        </div>
        <div className="side-bar-bottom-part">
            <Link to='/contactus'><button>Contact Us</button></Link>
        </div>
    </div>
  )
}

export default HomePageSideBar