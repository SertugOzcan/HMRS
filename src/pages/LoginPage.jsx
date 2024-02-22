import { useContext, useEffect, useState } from 'react';
import "./LoginPage.css";
import {useNavigate} from 'react-router-dom';
import {AuthContext} from '../context/AuthContext'
import AuthService from '../services/AuthService'

const LoginPage = () => {
  const [identity, setIdentity] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [visible, setVisible] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();
  const {logout, login} = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login(identity,password)
      const user = AuthService.getCurrentUser();
      if(response) {
        switch (user.role) {
          case 'SUPERVISOR':
            navigate("/yonetici-page")
            break;
          case 'PERSONNEL':
            navigate("/personel-page")
            break;
          case 'GUEST':
            navigate("/ziyaretci-page")
            break;  
          default:
            navigate("/login")
            break;
        }
      }
    } catch (error) {
      setErrorMessage('Wrong email or password!')
      setIsSuccess(false);
      setVisible(true);
    }

    setTimeout(() => {
      setVisible(false);
      setIsSuccess(false);
    }, 4000);

  };

  useEffect(() => {
    logout();
    const labels = document.querySelectorAll('.form-control label');
    labels.forEach(label => {
      label.innerHTML = label.innerText
        .split('')
        .map((letter, idx) => `<span style="transition-delay:${idx * 50}ms">${letter}</span>`)
        .join('');
    });
  }, []);


  return (
    <div className="guest-login-major-container">
      <div className="container">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-control">
        <input
        className='login-username-input'
          type="text"
          required
          value={identity}
          onChange={(e) => setIdentity(e.target.value)}
        />
        <label>Identity</label>
        </div>
        <div className="form-control">
        <input
        className='login-pwd-input'
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label>Password</label>
        </div>
        <button type='submit' className="btn">Giriş</button>
        <div className={`login-message ${visible ? 'show' : ''} ${isSuccess ? "success" : "error"}`}>
          {errorMessage}
        </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
