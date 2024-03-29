import { useContext, useEffect, useState } from "react";
import "./NavBar.css";
import { Link, useNavigate } from "react-router-dom";
import ThemeSlider from "../ThemeSlider";
import { AuthContext } from "../../context/AuthContext";
import LoginIcon from '../../assets/login.svg'
import LogoutIcon from '../../assets/logout.svg'

// eslint-disable-next-line react/prop-types
const NavBar = ({theme}) => {

  const {logout, isAuthenticated} = useContext(AuthContext);

  const [supervisorCurrentPage, setSupervisorCurrentPage] = useState("supervisor");

  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  }

  const handleLogout = () => {
    logout();
    navigate("/login");
  }

  const handleChange = () => {
    supervisorCurrentPage === "supervisor" ? setSupervisorCurrentPage("personnel") : setSupervisorCurrentPage("supervisor");
  }

  // VOLKAN: BU DENEME BAŞARISIZ OLDU...
  // useEffect(() => {
  //   const storedPage = localStorage.getItem("supervisorCurrentPage");
  //   if (storedPage) {
  //     setSupervisorCurrentPage(storedPage);
  //   } else {
  //     localStorage.setItem("supervisorCurrentPage", supervisorCurrentPage);
  //   }
  // }, []);
  
  // useEffect(() => {
  //   localStorage.setItem("supervisorCurrentPage", supervisorCurrentPage);
  // }, [supervisorCurrentPage]);

  return (
    //loggedin
    <div className={`header-major-container ${theme}`}>
      <div className="img-div">
        <button></button><span>MUSKETEERS HMRS</span>
      </div>
      <div className="btn-container">
      {isAuthenticated && isAuthenticated.role === "SUPERVISOR" 
      ? 
      <Link to={supervisorCurrentPage === "supervisor" ? "/personnel-page" : "/yonetici-page"}>
        <div onClick={handleChange} className={`switch-tabbing-button ${supervisorCurrentPage !== 'supervisor' ? 'guest' : ''}`} >{supervisorCurrentPage === "supervisor" ? "Personnel" : "Supervisor"}</div>
      </Link>
      :
      ""
      }
      {!isAuthenticated && <Link to="/register-page">
        <div className="nav-register-button">Register</div>
      </Link>}
      <div className={`log-actions-div ${isAuthenticated ? 'authenticated' : ''}`} onClick={isAuthenticated ? handleLogout : handleLogin}>     
          <span>{isAuthenticated ? "Logout" : "Login"}</span>
          <div>
              <img src={isAuthenticated ? LogoutIcon : LoginIcon}></img>
          </div> 
      </div>
      {isAuthenticated && <ThemeSlider/>}
      </div>
      
    </div>
  );
};

export default NavBar;
