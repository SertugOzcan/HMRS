import React from "react";
import "./Footer.css"
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-left">
        <Link to="/">
          <button>Home</button>
        </Link>
        <Link to="/aboutus">
          <button>About Us</button>
        </Link>
        <Link to="/contactus">
          <button>Contact Us</button>
        </Link>
      </div>
      <div className="footer-right">
        <p className="copyright text-center">
          © {new Date().getFullYear()}{"  "}
          <Link to="http://localhost:5173">
            Musketeers Human Resource Management System
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Footer;
