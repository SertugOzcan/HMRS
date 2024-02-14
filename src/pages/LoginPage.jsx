import React, { useEffect, useState } from 'react';
import "./LoginPage.css";
import axios from 'axios';

const LoginPage = () => {
  const [identity, setIdentity] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:9090/api/v1/auth/login',{identity: identity,
      password: password})
      const data = response.data
      console.log(response)
      console.log(data)
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
