import React, { useContext, useState } from 'react'
import './PersonnelInfoForm.css'
import { AuthContext } from '../../context/AuthContext'
import EditMyInfoForm from '../EditMyInfoForm/EditMyInfoForm'
import AddComment from '../AddCommentComponent/AddComment'
 
const PersonnelInfoForm = ({personnel}) => {
    const [isEditInfoClicked, setIsEditInfoClicked] = useState(false);
    const {isAuthenticated} = useContext(AuthContext);
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
            <button
              className="add-comment-button"
              onClick={(e) => handleAddCommentClick(e)}
            >
              Add Comment
            </button>
          </div>
        </div>
      </div>
    
  )
}

export default PersonnelInfoForm