import React, { useContext, useEffect, useState } from "react";
import "./YoneticiPage.css";
import axios from "axios";
import SupervisorPageIfCompanyUpdated from './SupervisorPageIfCompanyUpdated'
import UpdateCompanyForTheFirstTimePage from "./UpdateCompanyForTheFirstTimePage";

const YoneticiPage = () => {
  const [companyData, setCompanyData] = useState({});
  // const [personnelData, setPersonnelData] = useState({});
  const [companyStatus,setCompanyStatus] = useState('');
  const {isAuthenticated} = useContext(AuthContext);
  useEffect(() => {
    function getDataForSupervisor(){
      axios
      .get(`http://localhost:9095/api/v1/company/findbysupervizortoken/${isAuthenticated.token}`)
      .then((response) => response.json())
      .then((data) => {
        setCompanyData(data);
        if(data.status==="ACTIVE"){
          setCompanyStatus('ACTIVE')
        }
      })
      .catch((error) => console.error("Error while fetching the company data:", error));
    }
    getDataForSupervisor();
  }, []);

  return (  <>
    { companyStatus==='ACTIVE' && (<SupervisorPageIfCompanyUpdated value={{companyData}}/>)}
    { companyStatus==='PENDING' && (<UpdateCompanyForTheFirstTimePage value={companyData.companyName}/>)}
  </>);
};

export default YoneticiPage;