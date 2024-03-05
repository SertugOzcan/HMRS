import { useContext, useEffect, useState } from "react";
import "./LoginPage.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import AuthService from "../services/AuthService";

const LoginPage = () => {
  const [identity, setIdentity] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [visible, setVisible] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();
  const { logout, login } = useContext(AuthContext);

  // VOLKAN: Üstten URL ile logine dönülünce sidebar ekranda kalıyordu, logout yaptırtarak bi çözüm buldum maalesef...
  useEffect(() => {
    logout();
  },[]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login(identity, password);
      const user = AuthService.getCurrentUser();
      if (response) {
        switch (user.role) {
          case "SUPERVISOR":
            navigate("/yonetici-page");
            break;
          case "PERSONNEL":
            navigate("/personnel-page");
            break;
          case "GUEST":
            navigate("/ziyaretci-page");
            break;
          default:
            navigate("/login");
            break;
        }
      }
    } catch (error) {
      setErrorMessage("Wrong email or password!");
      setIsSuccess(false);
      setVisible(true);
    }

    setTimeout(() => {
      setVisible(false);
      setIsSuccess(false);
    }, 4000);
  };

  

  return (
    <section className="sectionLogin">
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <span></span> <span></span> <span></span> <span></span> <span></span>
      <div className="signin">
        <div className="contentsLogin">
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <div className="form">
              <div className="inputBox">
                <input
                  className="login-username-input"
                  type="text"
                  required
                  value={identity}
                  onChange={(e) => setIdentity(e.target.value)}
                />
                <i>Username</i>
              </div>
              <div className="inputBox">
                <input
                  className="login-pwd-input"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <i>Password</i>
              </div>

              <input className="giris" type="submit" value="Sign in" />
              <div
                className={`login-message ${visible ? "show" : ""} ${
                  isSuccess ? "success" : "error"
                }`}
              >
                {errorMessage}
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
