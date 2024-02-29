/* eslint-disable react/prop-types */
import "./Footer.css"
import { Link } from "react-router-dom";

const Footer = ({theme}) => {
  return (
    <footer className={`footer-container ${theme}`}>
      <div className={`footer-left ${theme}`}>
        <Link to="/">
          <button>Home</button>
        </Link>
        <Link to="/about-us">
          <button>About Us</button>
        </Link>
        <Link to="/contactus">
          <button>Contact Us</button>
        </Link>
      </div>
      <div className={`footer-right ${theme}`}>
        <p className="copyright text-center">
          © {new Date().getFullYear()}{"  "}
          <Link className={`footer-link ${theme}`} to="http://localhost:5173">
             Musketeers Human Resource Management System
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
