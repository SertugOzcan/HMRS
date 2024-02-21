import React from 'react'
import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {AuthContext} from '../../context/AuthContext'
import './HomePageSideBar.css'
const HomePageSideBar = () => {
    const {isAuthenticated} = useContext(AuthContext);
    
    let content;
    switch (isAuthenticated.role) {
      case "ADMIN":
        content = <div>
          <Link to='/admin-page/registered-users'><button>Active Users</button></Link>
          <Link to='/admin-page/manager-requests'><button>Manager Requests</button></Link>
          <Link to='/admin-page/comment-requests'><button>Comment Requests</button></Link>
          </div>        
        break;
      case "SUPERVISOR":
        content = <div>Supervisor içeriği</div>
        break;
      case "PERSONNEL":
        content = <div>Personnel içeriği</div>
        break;
      case "GUEST":
        content = <div>Guest içeriği</div>
        break;
      default:
        content = null;
    }
  return (
    <div className='side-bar-container'>
        <div className="side-bar-upper-part">
            <button></button><span>MUSKETEERS HMRS</span>
        </div>
        <div className='side-bar-inner-body'>
            {content}
        </div>
        <div className="side-bar-bottom-part">
            <Link to='/contactus'><button>Contact Us</button></Link>
        </div>
    </div>
  )
}

export default HomePageSideBar