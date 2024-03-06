import { useContext } from "react";
import "./YoneticiPage.css";
import UpdateCompanyForTheFirstTimePage from "./UpdateCompanyForTheFirstTimePage";
import { SupervisorPageAPIContext } from "../context/SupervisorPageAPIContext";
import SupervisorPageCompanyData from "../components/SupervisorPageCompanyData/SupervisorPageCompanyData";


const YoneticiPage = () => {

  const {companyStatus} = useContext(SupervisorPageAPIContext);


  return (
    <div className="yonetici-page-container">
      {companyStatus === '' ? (
        <h1>LOADING</h1>
      ) : companyStatus === 'PENDING' ? (
        <UpdateCompanyForTheFirstTimePage />
      ) : (
        <SupervisorPageCompanyData />
      )}
    </div>
  );
}

export default YoneticiPage;