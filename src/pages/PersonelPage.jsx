import React, { useContext, useState } from "react";
import "./PersonelPage.css";
import { PersonnelPageAPIContext } from "../context/PersonalPageAPIContext";
import AddComment from "../components/AddCommentComponent/AddComment";
import EditMyInfoForm from "../components/EditMyInfoForm/EditMyInfoForm";

const PersonelPage = () => {
  const { personnel } = useContext(PersonnelPageAPIContext);
  const [isEditInfoClicked, setIsEditInfoClicked] = useState(false);

  const handleEditInfoClick = (e) => {
    e.preventDefault();
    setIsEditInfoClicked(true);
  };

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
      <div className="personnel-container">
        <div className="personnel-photo">
          {/* <img src={image}></img> */}
          <img src={personnel.image}></img>
        </div>
        <div className="personnel-info">
          <p>
            <strong>Name:</strong> {personnel.name} {personnel.lastName}
          </p>
          <p>
            <strong>Email:</strong> {personnel.email}{" "}
          </p>
          <p>
            <strong>Phone:</strong> {personnel.phones[0].phoneType} -{" "}
            {personnel.phones[0].phoneNumber}
          </p>
          <p>
            <strong>Company:</strong> {personnel.companyName}
          </p>
          <p>
            <strong>Shift:</strong> {personnel.department.shift}
          </p>
          <p>
            <strong>Break:</strong> {personnel.department.break}
          </p>
          <p>
            <strong>Salary:</strong> {personnel.salary}
          </p>
          <br />
          <br />
          <br />
          <button
            className="edit-info-button"
            onClick={(e) => handleEditInfoClick(e)}
          >
            Edit My Info
          </button>
          {isEditInfoClicked && (
            <div
              className="edit-info-background"
              onClick={() => setIsEditInfoClicked(false)}
            >
              <div
                className="edit-info-content"
                onClick={(e) => e.stopPropagation()}
              >
                <EditMyInfoForm />
              </div>
            </div>
          )}
          <div className="personnel-company-summary">
            {/* <img src={compyImage}></img> */}
            <img src={personnel.companyLogo}></img>
            <div className="personnel-company-info">
              <h2>{personnel.companyName}</h2>
              <p>Şirket İletişim Bilgileri: info@xyzcompany.com</p>
              <p>Resmi Tatil Bilgileri: 1 Ocak, 23 Nisan, 1 Mayıs</p>
            </div>
          </div>
        </div>
      </div>
      <AddComment />
    </div>
  );
};

export default PersonelPage;
