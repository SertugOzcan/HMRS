import React from "react";
import "./PersonnelPageCompanyInfoForm.css";
import HRInfoCard from "../HRInfoCard/HRInfoCard";

const PersonnelPageCompanyInfoForm = ({ personnel }) => {
  return (
    <div className="personnel-company-summary">
      <div className="personnel-company-img-and-company-name">
        <img src={personnel.companyLogo}></img>
        <h2>{personnel.companyName}</h2>
      </div>
      <div className="personnel-company-info-container">
        <div className="personnel-company-info">
          <div className="personnel-company-hr-info-container">
            <strong>Şirket İletişim Bilgileri:</strong>
            <div className="personnel-company-hr-info">
              {personnel.hrInfos.map((hrInfo) => (
                <HRInfoCard hrInfo={hrInfo} />
              ))}
            </div>
          </div>
          <div className="personnel-company-holiday-info">
            <strong>Resmi Tatil Bilgileri</strong>
            <table>
              <thead>
                <tr>
                  <th>Holiday Name</th>
                  <th>Holiday Begins</th>
                  <th>Holiday Ends</th>
                </tr>
              </thead>
              <tbody>
                {personnel.companyHolidays.map((holiday, index) => (
                  <tr key={index}>
                    <td>{holiday.name}</td>
                    <td>{holiday.startTime}</td>
                    <td>{holiday.endTime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonnelPageCompanyInfoForm;
