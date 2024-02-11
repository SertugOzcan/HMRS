import React, { useEffect, useState } from 'react';
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
    <div className="container">
      <h2>Admin Login</h2>
      <form>
        <div className="form-control">
      <input
        type="text"
        required
        value={email}
        onChange={(e) => setemail(e.target.value)}
        
      />
      <label>Email</label>
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
      <button className="btn" onClick={handleLogin}>Giriş</button>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      </form>
    </div>
  );
};


export default AdminLoginPage;
