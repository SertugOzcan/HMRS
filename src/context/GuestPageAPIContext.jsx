import { createContext, useEffect, useState } from "react";
import axios from "axios";
export const GuestPageAPIContext = createContext();

// eslint-disable-next-line react/prop-types
export const GuestPageAPIContextProvider = ({ children }) => {
  const [companyData, setCompanyData] = useState([]);
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);
  const [selectedCompanyInfo, setSelectedCompanyInfo] = useState({});
  const [comments, setComments] = useState([])

  useEffect(() => {
    const getRequests = async () => {
      try {
        const response = await axios.get(
          'http://localhost:80/company/get-company-summary-info-for-guest/SEARCH_FIELD_EMPTY'
        );
        setCompanyData(response.data);
      } catch (error) {
        console.error("Error while fetching the company data:", error);
      }
    };
    getRequests();
  }, []);

  return (
    <GuestPageAPIContext.Provider
      value={{ companyData, selectedCompanyId, setSelectedCompanyId ,selectedCompanyInfo, setSelectedCompanyInfo, setComments,comments}}
    >
      {children}
    </GuestPageAPIContext.Provider>
  );
};
