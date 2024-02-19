import React, { useEffect } from 'react';
import "./ZiyaretciPage.css";
import axios from 'axios';
import CompanyList from '../components/CompanyCardAndList/CompanyList';
import CompanyInfo from '../components/CompanyInfo/CompanyInfo';

// ???????


const ZiyaretciPage = () => {


  useEffect(() => {
    axios
      .get("api/v1/test/????")

      .then((response) => response.json())
      .then((data) => {
        setFinancialData(data.financialData);
      })
      .catch((error) => console.error("Error fetching data:", error));
      
  }, []);

  return (
    <div className='guest-page'>
      <div className="guest-container">
        <div className='guest-texts'>
          <h1>About Us</h1>
          <h3>Embarking on a Journey to Provide Our Customers with a Better Management Platform.</h3>
          <p>Musketeers, with its founders Bahadir, Sertug, Muhittin and Volkan is making a difference in the business world with our innovative approaches and strong customer relationships. We are committed to providing our customers with a superior experience. Join us and initiate your transformation.</p>
          <button className='guest-button'>Start Exploring</button>
        </div>
        <div className='guest-img'>
          <img src="https://static.vecteezy.com/system/resources/previews/024/785/747/non_2x/3d-male-character-working-on-a-laptop-free-png.png" alt="" />
      </div>
    </div>

    <div className='guest-companies-container'>
        <h1>companies working with us</h1>
        <div>
          <CompanyList />
        </div>
        
    </div>
    
    <CompanyInfo />

      {/*<h2>About Us</h2>
      <div className="site-info">
        <h3>Site Information</h3>
        <p>Company: Musketeers</p>
        <p>Administrator: John Doe</p>
  <p>Platform Purpose: something something </p>
      </div>*/}
    </div>
  );
}

export default ZiyaretciPage;
