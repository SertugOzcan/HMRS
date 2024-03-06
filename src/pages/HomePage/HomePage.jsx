import { useContext, useEffect } from "react";
import "./HomePage.css"
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../../context/AuthContext";
const HomePage = () => {
    const navigate = useNavigate();
    const { logout } = useContext(AuthContext);

     // VOLKAN: Loginliyken tıklanılınca sidebar ekranda kalıyordu, logout yaptırtarak bi çözüm buldum maalesef...
    useEffect(() => {
      logout();
    },[]);

    const handleClickBtn = () =>{
        navigate('/login')
    }
  return (
    <div className='home-page'>
      <div className="home-container">
        <div className='home-texts'>
          <h1>About Us</h1>
          <h3>Embarking on a Journey to Provide Our Customers with a Better Management Platform.</h3>
          <p>Musketeers, with its founders Bahadir, Sertug, Muhittin and Volkan is making a difference in the business world with our innovative approaches and strong customer relationships. We are committed to providing our customers with a superior experience. Join us and initiate your transformation.</p>
          <button className='home-button' onClick={handleClickBtn}>Start Exploring</button>
        </div>
        <div className='home-img'>
          <img src="https://static.vecteezy.com/system/resources/previews/024/785/747/non_2x/3d-male-character-working-on-a-laptop-free-png.png" alt="" />
        </div>
      </div>
    </div>
  );
}

export default HomePage;