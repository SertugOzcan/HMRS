import { useContext } from 'react'
import { Link } from 'react-router-dom'
import {AuthContext} from '../../context/AuthContext'
import './HomePageSideBar.css'
import { SidebarCheckForSupervisorContext } from '../../context/SidebarCheckForSupervisorContext'
const HomePageSideBar = () => {
    const {isAuthenticated} = useContext(AuthContext);
    const {showSidebar} = useContext(SidebarCheckForSupervisorContext);
    
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
        content = 
        showSidebar !== "5" ?
        <div>
          <Link to='/yonetici-page/company-data'><button>Company Data</button></Link>
          <br />
          <Link to='/yonetici-page/employee-list'><button>Employee List</button></Link>
          <br />
          <Link to='/yonetici-page/dayoff-requests'><button>Dayoff Requests</button></Link>
          <br />
          <Link to='/yonetici-page/advance-requests'><button>Advance Requests</button></Link>
          <br />
          <Link to='/yonetici-page/spending-requests'><button>Spending Requests</button></Link>
        </div>
        :
        ""
        break;
      case "PERSONNEL":
        content = <div>
          <Link to='/personnel-page/my-profile'><button>My Profile</button></Link>
          <br />
          <Link to='/personnel-page/request-dayoff'><button>Request For Dayoff</button></Link>
          <br />
          <Link to='/personnel-page/request-advance'><button>Request For Advance</button></Link>
          <br />
          <Link to='/personnel-page/requests-spending'><button>Request For Spending</button></Link>
          <br />
          <Link to='/personnel-page/create-comment'><button>Comment To Company</button></Link>
        </div>
        break;
      default:
        content = null;
    }
  return (
    <>
    {isAuthenticated.role !== "GUEST" ? 
    <div className='side-bar-container'>
        <div className="side-bar-upper-part">
            <span>{isAuthenticated.role} PAGE</span>
        </div>
        <div className='side-bar-inner-body'>
          <div className='side-bar-inner-second-body'>
            {content}
          </div>
        </div>
    </div> 
    : 
    ""}
    </>
  )
}

export default HomePageSideBar