import React, { useState } from 'react';
import "./AdminLoginPage.css";

const AdminLoginPage = () => {
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = () => {
    // Burada kullanıcı adı ve şifre kontrolü yapılabilir
    if (email === 'admin' && password === 'password') {
      // Giriş başarılı
      alert('Giriş başarılı!');
    } else {
      // Giriş başarısız
      setErrorMessage('Kullanıcı adı veya şifre yanlış!');
    }
  };

  return (
    <div className="admin-login-container">
      <h2>Admin Login</h2>
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

export default AdminLoginPage;
