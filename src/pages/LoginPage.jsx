import React, { useContext, useEffect, useState } from 'react';
import "./LoginPage.css";
import {useNavigate} from 'react-router-dom';
import {AuthContext} from '../context/AuthContext'

const LoginPage = () => {
  const [identity, setIdentity] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const {login} = useContext(AuthContext)
      const response = login(identity,password)
      const data = response.data
      switch (data.role) {
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
    } catch (error) {
      setErrorMessage('Kullanıcı adı veya şifre yanlış!')
    }
  };


  
  // LOGIN INPUT FONSIYONU 
  useEffect(() => {
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
          type="text"
          required
          value={identity}
          onChange={(e) => setIdentity(e.target.value)}
        />
        <label>Identity</label>
        </div>
        <div className="form-control">
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label>Password</label>
        </div>
        <button type='submit' className="btn">Giriş</button>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
