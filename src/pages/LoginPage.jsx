import React, { useState } from 'react';
import "./LoginPage.css";

const LoginPage = () => {
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = () => {
    // email ve şifre kontrolü
    if (email === 'user' && password === 'password') {
      // Giriş başarılı
      alert('Giriş başarılı!');
    } else {
      // Giriş başarısız
      setErrorMessage('Kullanıcı adı veya şifre yanlış!');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setemail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Şifre"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Giriş</button>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
};

export default LoginPage;
