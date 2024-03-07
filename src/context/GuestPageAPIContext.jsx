import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";
export const GuestPageAPIContext = createContext();

// eslint-disable-next-line react/prop-types
export const GuestPageAPIContextProvider = ({ children }) => {
  const [companyData, setCompanyData] = useState([]);
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);
  const [selectedCompanyInfo, setSelectedCompanyInfo] = useState({});
  const [comments, setComments] = useState([])
  const {isAuthenticated} = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const getRequests = async () => {
      if(isAuthenticated.role!=="GUEST"){
        return navigate("/login")
      }
      try {
        const response = await axios.get(
          'http://34.75.226.10:80/company/get-company-summary-info-for-guest/SEARCH_FIELD_EMPTY'
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
