import React, { useEffect, useState } from 'react';
import "./YoneticiPage.css";

const YoneticiPage = () => {
  const [financialData, setFinancialData] = useState({});

  useEffect(() => {
    
    fetch('backend-url')
      .then(response => response.json())
      .then(data => {
        
        setFinancialData(data.financialData);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="yonetici-container">
      <h2>Yönetici Sayfası</h2>
      <div className="calisan-listesi">
        <h3>Çalışan Listesi</h3>
        {/* Çalışan listesi   */}
      </div>
      <div className="finansal-bilgiler">
        <h3>Finansal Bilgiler</h3>
        <div className="finansal-kutular">
          <div className="finansal-kutu">
            <p><strong>Kar/Zarar Bilgileri:</strong> {financialData.profitLoss}</p>
          </div>
          <div className="finansal-kutu">
            <p><strong>Toplam Gider Bilgisi:</strong> {financialData.totalExpenses}</p>
          </div>
          <div className="finansal-kutu">
            <p><strong>Yaklaşan Ödeme Bilgileri:</strong> {financialData.upcomingPayments}</p>
          </div>
          <div className="finansal-kutu">
            <p><strong>Resmi Tatil Bilgileri:</strong> {financialData.holidayInfo}</p>
          </div>
          <div className="finansal-kutu">
            <p><strong>Personel İzin Hakkı:</strong> {financialData.employeeLeave} gün</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default YoneticiPage;
