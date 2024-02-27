import React from 'react'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import {AuthContext} from '../../context/AuthContext'
import './HomePageSideBar.css'
const HomePageSideBar = () => {
    const {isAuthenticated} = useContext(AuthContext);
    
    let content;
    switch (isAuthenticated.role) {
      case "ADMIN":
        content = <div>
          <Link to='/admin-page/registered-users'><button>Active Users</button></Link>
          <br />
          <Link to='/admin-page/manager-requests'><button>Manager Requests</button></Link>
          <br />
          <Link to='/admin-page/comment-requests'><button>Comment Requests</button></Link>
          </div>        
        break;
      case "SUPERVISOR":
        content = <div>
          <Link to='/yonetici-page/employee-list'><button>Employee List</button></Link>
          <br />
          <Link to='/yonetici-page/company-data'><button>Company Data</button></Link>
          <br />
          <Link to='/yonetici-page/dayoff-requests'><button>Dayoff Requests</button></Link>
          <br />
          <Link to='/yonetici-page/advance-requests'><button>Advance Requests</button></Link>
          <br />
          <Link to='/yonetici-page/spending-requests'><button>Spending Requests</button></Link>
        </div>
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
          <div className='side-bar-inner-second-body'>
            {content}
          </div>
            
        </div>
    </div>
  )
}

export default HomePageSideBar