import React, { useContext, useEffect } from "react";
import "./CompanyList.css";
import { GuestPageAPIContext } from "../../context/GuestPageAPIContext";
import CompanyCard from "./CompanyCard";
import CompanyInfo from "../CompanyInfo/CompanyInfo"

import axios from "axios";

const CompanyList = () => {
  const { companyData, selectedCompanyId } = useContext(GuestPageAPIContext);

  useEffect(() => {
    const getCompanyInfo = async () => {
      if (selectedCompanyId) {
        try {
          const response = await axios.get(
            `http://localhost:9095/api/v1/company/get-company-detailed-info-for-guest/${selectedCompanyId}`
          );
          console.log("Company info:", response.data);
        } catch (error) {
          console.error("Error while fetching company info:", error);
        }
      }
    };
    getCompanyInfo();
  }, [selectedCompanyId]);

  return (
    <>
      <div className="company-list-container">
        {companyData.map((company) => (
          <CompanyCard key={company.id} company={company} />
        ))}
      </div>
      {selectedCompanyId && <CompanyInfo companyId={selectedCompanyId} />}
    </>
);
};

export default CompanyList;
