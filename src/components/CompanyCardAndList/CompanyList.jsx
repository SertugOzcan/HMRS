import React, { useContext, useEffect, useState } from "react";
import "./CompanyList.css";
import { GuestPageAPIContext } from "../../context/GuestPageAPIContext";
import CompanyCard from "./CompanyCard";
import CompanyInfo from "../CompanyInfo/CompanyInfo"

import axios from "axios";

const CompanyList = () => {
  const { companyData, selectedCompanyId ,selectedCompanyInfo, setSelectedCompanyInfo, setSelectedCompanyId} = useContext(GuestPageAPIContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCompanies, setFilteredCompanies] = useState([]);

  useEffect(() => {
    const getCompanyInfo = async () => {
      if (selectedCompanyId) {
        try {
          const response = await axios.get(
            `http://localhost:9095/api/v1/company/get-company-detailed-info-for-guest/${selectedCompanyId}`
          );
          console.log("Company info:", response.data);
          setSelectedCompanyInfo(response.data)
        } catch (error) {
          console.error("Error while fetching company info:", error);
        }
      }
    };
    getCompanyInfo();
  }, [selectedCompanyId]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:9095/api/v1/company/get-company-summary-info-for-guest/${searchTerm}`
      );
      setFilteredCompanies(response.data);

      const searchedCompany = response.data.find(company => company.name.toLowerCase().includes(searchTerm.toLowerCase()));
    if (searchedCompany) {
      setSelectedCompanyId(searchedCompany.id);
    } else {
      setSelectedCompanyId(null);
    }
    } catch (error) {
      console.error("Error while searching companies:", error);
    }
  };

  return (
     <>
      <div className="search-container">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for a company..."
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="company-list-container">
        {filteredCompanies.length > 0
          ? filteredCompanies.map((company) => (
              <CompanyCard key={company.id} company={company} />
            ))
          : companyData.map((company) => (
              <CompanyCard key={company.id} company={company} />
            ))}
            {selectedCompanyId && <CompanyInfo companyId={selectedCompanyId} selectedCompanyInfo={selectedCompanyInfo} setFilteredCompanies={setFilteredCompanies}/>}
      </div>
      
    </>
);
};

export default CompanyList;
