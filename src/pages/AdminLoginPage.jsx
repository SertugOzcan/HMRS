import { useContext, useEffect, useState } from 'react';
import "./AdminLoginPage.css";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'
import AuthService from '../services/AuthService'

const AdminLoginPage = () => {
  const [identity, setIdentity] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const {login} = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try { 
      const response = login(identity,password)
      const user = AuthService.getCurrentUser();
      console.log(`BİZİM KOYDUGUMUZ : ${user.role}`)
      if(response && user.role === 'ADMIN'){
        navigate("/admin-page")
      }
    } catch (error) {
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
    <div className="admin-login-major-container">
      <div className="container">
        <h2>Admin Login</h2>
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


export default AdminLoginPage;
