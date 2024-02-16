import { useContext } from "react";
import "./YoneticiPage.css";
import SupervisorPageIfCompanyUpdated from './SupervisorPageIfCompanyUpdated'
import UpdateCompanyForTheFirstTimePage from "./UpdateCompanyForTheFirstTimePage";
import { SupervisorPageAPIContext } from "../context/SupervisorPageAPIContext";


const YoneticiPage = () => {

  const {companyStatus} = useContext(SupervisorPageAPIContext);


  return (
    <>
      {companyStatus === 'ACTIVE' ? (
        <SupervisorPageIfCompanyUpdated />
      ) : (
        <UpdateCompanyForTheFirstTimePage />
      )}
    </>
  );
}

export default YoneticiPage;