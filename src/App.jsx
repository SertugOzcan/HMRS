import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import AdminLoginPage from './pages/AdminLoginPage';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';
import YoneticiPage from './pages/YoneticiPage';
import ZiyaretciPage from './pages/ZiyaretciPage';
import PersonelPage from './pages/PersonelPage';
import RegisterPage from './pages/RegisterPage';


import "./App.css";
import { UserPreferencesContext } from './context/UserPreferencesContext';
import { useContext } from 'react';
import ThemeSlider from './components/ThemeSlider';



function App() {


const {theme} = useContext(UserPreferencesContext)

  return (
    
    <Router>
      <div className={`nav ${theme}`}>
        <Link to="/admin-login"><button>Admin Login</button></Link>
        <Link to="/login"><button>Login</button></Link>
        <Link to="/admin-page"><button>Admin page</button></Link>
        <Link to="/yonetici-page"><button>Yönetici page</button></Link>
        <Link to="/ziyaretci-page"><button>Ziyaretçi page</button></Link>
        <Link to="/personel-page"><button>Personel page</button></Link>
        <Link to="/register-page"><button>Register page</button></Link>
        <ThemeSlider/>
      </div>

      <Routes>
        <Route path="/admin-login" element={<AdminLoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin-page" element={<AdminPage />} />
        <Route path="/yonetici-page" element={<YoneticiPage />} />
        <Route path="/ziyaretci-page" element={<ZiyaretciPage />} />
        <Route path="/personel-page" element={<PersonelPage />} />
        <Route path="/register-page" element={<RegisterPage />} />
      </Routes>
    </Router>
    
  );
}

export default App;
