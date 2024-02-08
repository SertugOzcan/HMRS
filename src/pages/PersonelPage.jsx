import React from 'react';
import "./PersonelPage.css";

const PersonelPage = () => {
  return (
    <div className="personel-container">
      <div className="personel-info">
        <h2>Personel Bilgileri</h2>
        <p>Ad Soyad: John Doe</p>
        <p>Email: john.doe@example.com</p>
        <p>Telefon: 123-456-7890</p>
        <p>Çalıştığı Şirket: XYZ Company</p>
        <p>Vardiya: Sabah</p>
        <p>Mola Bilgileri: 12:00 - 13:00</p>
        <p>Maaş: $5000</p>
      </div>
      <div className="company-info">
        <h2>Şirket Bilgileri</h2>
        <p>Şirket İletişim Bilgileri: info@xyzcompany.com</p>
        <p>Resmi Tatil Bilgileri: 1 Ocak, 23 Nisan, 1 Mayıs</p>
      </div>
      <div className="personel-photo">
        <img src="personel-photo.jpg" alt="Personel Fotoğrafı" />
      </div>
    </div>
  );
};

export default PersonelPage;
