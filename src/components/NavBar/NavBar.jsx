import React from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";
import ThemeSlider from "../ThemeSlider";

const NavBar = ({theme}) => {
  return (
    //loggedin
    <div className={`header-major-container ${theme}`}>
      <Link to="/login">
        <button>Login</button>
      </Link>
      <Link to="/register-page">
        <button>Register</button>
      </Link>
      <ThemeSlider/>
    </div>
  );
};

export default NavBar;
