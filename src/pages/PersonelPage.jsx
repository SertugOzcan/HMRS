import React, { useContext, useState } from "react";
import "./PersonelPage.css";
import { PersonnelPageAPIContext } from "../context/PersonalPageAPIContext";
import AddComment from "../components/AddCommentComponent/AddComment";
import EditMyInfoForm from "../components/EditMyInfoForm/EditMyInfoForm";
import { AuthContext } from "../context/AuthContext";
import HRInfoCard from "../components/HRInfoCard/HRInfoCard";
import PersonnelInfoForm from "../components/PersonnelInfoForm/PersonnelInfoForm";
import PersonnelPageCompanyInfoForm from "../components/PersonnelPageCompanyInfoForm/PersonnelPageCompanyInfoForm";

const PersonelPage = () => {
  const { personnel } = useContext(PersonnelPageAPIContext);
  const [isEditInfoClicked, setIsEditInfoClicked] = useState(false);
  const { isAuthenticated } = useContext(AuthContext);
  

  return (
    <div className="personnel-page-container">
      <main className="personnel-page-main" id="main">
        <section className="personnel-page-main-section">
          <h1>
            Welcome to the MUSKEETERS HR System Management, {personnel.name} !
          </h1>
          <br />
          <h4>
            You can view your profile, company info and see other personnel
            profiles...
          </h4>
        </section>
      </main>
      
      <PersonnelInfoForm personnel={personnel}/>

      <PersonnelPageCompanyInfoForm personnel={personnel}/>
      
    </div>
  );
};

export default PersonelPage;
