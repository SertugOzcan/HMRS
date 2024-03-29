import { useContext, useEffect, useState } from "react";
import "./CompanyList.css";
import { GuestPageAPIContext } from "../../context/GuestPageAPIContext";
import CompanyCard from "./CompanyCard";
import CompanyInfo from "../CompanyInfo/CompanyInfo"

import axios from "axios";

const CompanyList = () => {
  const { companyData, selectedCompanyId ,selectedCompanyInfo, setSelectedCompanyInfo, setSelectedCompanyId, setComments} = useContext(GuestPageAPIContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [loading,setLoading] = useState(true)

  // const { companyData, selectedCompanyId } = useContext(GuestPageAPIContext);
  // const [ selectedCompanyComments, setSelectedCompanyComments ] = useState([]);

  useEffect(() => {
    const getCompanyInfo = async () => {
      if (selectedCompanyId) {
        try {
          setLoading(true)
          const response1 = await axios.get(
            `http://34.75.226.10:80/company/get-company-detailed-info-for-guest/${selectedCompanyId}`
          );
          setSelectedCompanyInfo(response1.data)
          // console.log("Company info:", response1.data);
          const response2 = await axios.get(
            `http://34.75.226.10:80/comment/get-all-by-company/${selectedCompanyId}`
          );
          // console.log("Company active comments:", response2.data);
          if(response2.status === 200) {
            setComments(response2.data);
          }
        } catch (error) {
          console.error("Error while fetching company info:", error);
        }finally{
          setLoading(false)
        }
      }
    };
    getCompanyInfo();
  }, [selectedCompanyId]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://34.75.226.10:80/company/get-company-summary-info-for-guest/${searchTerm}`
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
            {selectedCompanyId && !loading && <CompanyInfo companyId={selectedCompanyId} selectedCompanyInfo={selectedCompanyInfo} setFilteredCompanies={setFilteredCompanies}/>}
      </div>

      

      {/* {selectedCompanyId && <CompanyInfo companyId={selectedCompanyId}  />} */}
    </>
);
};

export default CompanyList;
