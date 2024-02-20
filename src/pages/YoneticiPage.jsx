import { useContext } from "react";
import "./YoneticiPage.css";
import SupervisorPageIfCompanyUpdated from './SupervisorPageIfCompanyUpdated'
import UpdateCompanyForTheFirstTimePage from "./UpdateCompanyForTheFirstTimePage";
import { SupervisorPageAPIContext } from "../context/SupervisorPageAPIContext";


const YoneticiPage = () => {

  const {companyStatus} = useContext(SupervisorPageAPIContext);


  return (
    <>
      {companyStatus === '' ? (
        <h1>LOADING</h1>
      ) : companyStatus === 'PENDING' ? (
        <UpdateCompanyForTheFirstTimePage />
      ) : (
        <SupervisorPageIfCompanyUpdated />
      )}
    </>
  );
}

export default YoneticiPage;