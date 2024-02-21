import React, { useContext, useEffect, useState } from "react";
import "./CompanyList.css";
import { GuestPageAPIContext } from "../../context/GuestPageAPIContext";
import CompanyCard from "./CompanyCard";
import CompanyInfo from "../CompanyInfo/CompanyInfo"

import axios from "axios";

const CompanyList = () => {
  const { companyData, selectedCompanyId } = useContext(GuestPageAPIContext);
  const [ selectedCompanyComments, setSelectedCompanyComments ] = useState([]);

  useEffect(() => {
    const getCompanyInfo = async () => {
      if (selectedCompanyId) {
        try {
          const response1 = await axios.get(
            `http://localhost:9095/api/v1/company/get-company-detailed-info-for-guest/${selectedCompanyId}`
          );
          console.log("Company info:", response1.data);
          const response2 = await axios.get(
            `http://localhost:9097/api/v1/comment/get-all-by-company/${selectedCompanyId}`
          );
          console.log("Company active comments:", response2);
          console.log("Company active comments data:", response2.data);
          if(response2.status === 200) {
            setSelectedCompanyComments(response2.data);
          }
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
      {selectedCompanyId && <CompanyInfo companyId={selectedCompanyId}  />}
    </>
);
};

export default CompanyList;
