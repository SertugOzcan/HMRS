import React, { useEffect } from 'react';
import "./ZiyaretciPage.css";
import axios from 'axios';

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
    <div className="ziyaretci-container">
      <h2>About Us</h2>
      <div className="site-info">
        <h3>Site Information</h3>
        <p>Company: XYZ Corp</p>
        <p>Administrator: John Doe</p>
        <p>Platform Purpose: something something </p>
      </div>
    </div>
  );
}

export default ZiyaretciPage;
