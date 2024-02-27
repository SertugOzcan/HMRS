import React, { useContext, useState } from "react";
import "./PersonnelInfoForm.css";
import { AuthContext } from "../../context/AuthContext";
import EditMyInfoForm from "../EditMyInfoForm/EditMyInfoForm";
import { PersonnelPageAPIContext } from "../../context/PersonalPageAPIContext";

const PersonnelInfoForm = () => {
  const [isEditInfoClicked, setIsEditInfoClicked] = useState(false);
  const { isAuthenticated } = useContext(AuthContext);
  const { personnel } = useContext(PersonnelPageAPIContext);
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
          You can view your profile, your company information and create a comment for your company...
            Aslo you can ask for dayoff, spending or advance requests to your supervisor...
          </h4>
        </section>
      </main>
      <div className="personnel-container">
        <div className="personnel-photo">
          <img src={personnel.image}></img>
        </div>
        <div className="personnel-info">
          <p>
            <strong>Name:</strong> {personnel.name} {personnel.lastName}
          </p>
          <p>
            <strong>Email:</strong> {personnel.email}
          </p>
          <p>
            <strong>Phone:</strong> {personnel.phones[0].phoneType}
            {personnel.phones[0].phoneNumber}
          </p>
          <p>
            <strong>Company:</strong> {personnel.companyName}
          </p>
          {isAuthenticated.role === "PERSONNEL" && (
            <>
              <p>
                <strong>Shift:</strong> {personnel.department.shiftHour}
              </p>
              <p>
                <strong>Break:</strong> {personnel.department.breakHour}
              </p>
              <p>
                <strong>Salary:</strong> {personnel.salary}
              </p>
            </>
          )}
          <div className="btn-container">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonnelInfoForm;
