import React, { useContext, useState } from "react";
import "./PersonelPage.css";
import { PersonnelPageAPIContext } from "../context/PersonalPageAPIContext";
import AddComment from "../components/AddCommentComponent/AddComment";
import EditMyInfoForm from "../components/EditMyInfoForm/EditMyInfoForm";
import { AuthContext } from "../context/AuthContext";
import HRInfoCard from "../components/HRInfoCard/HRInfoCard";

const PersonelPage = () => {
  const { personnel } = useContext(PersonnelPageAPIContext);
  const [isEditInfoClicked, setIsEditInfoClicked] = useState(false);
  const { isAuthenticated } = useContext(AuthContext);
  const [isAddCommentClicked, setIsAddCommentClicked] = useState(false);
  const handleEditInfoClick = (e) => {
    e.preventDefault();
    setIsEditInfoClicked(true);
  };
  const handleAddCommentClick = (e) => {
    e.preventDefault();
    setIsAddCommentClicked(true);
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
                <strong>Shift:</strong> {personnel.department.shift}
              </p>
              <p>
                <strong>Break:</strong> {personnel.department.break}
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

            <button
              className="add-comment-button"
              onClick={(e) => handleAddCommentClick(e)}
            >
              Add Comment
            </button>
          </div>
        </div>
      </div>

      <div className="personnel-company-summary">
        <div className="personnel-company-img-and-company-name">
          <img src={personnel.companyLogo}></img>
          <h2>{personnel.companyName}</h2>
        </div>
        <div className="personnel-company-info-container">
          <div className="personnel-company-info">
            <div className="personnel-company-hr-info-container">
              <strong>Şirket İletişim Bilgileri:</strong>
              <div className="personnel-company-hr-info">
                {personnel.hrInfos.map((hrInfo) => (
                  <HRInfoCard hrInfo={hrInfo} />
                ))}
              </div>
            </div>
            <div className="personnel-company-holiday-info">
              <strong>Resmi Tatil Bilgileri:</strong>
              {isAddCommentClicked && (
                <div
                  className="add-comment-background"
                  onClick={() => setIsAddCommentClicked(false)}
                >
                  <div
                    className="add-comment-content"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <AddComment
                      setIsAddCommentClicked={setIsAddCommentClicked}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonelPage;
