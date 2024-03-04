import { useContext, useState, useRef, useEffect } from "react";
import { PersonnelPageSpendingAPIContext } from "../../context/PersonnelPageSpendingAPIContext";
import PersonnelSpendingRequestForm from "../PersonnelSpendingRequestForm/PersonnelSpendingRequestForm";
import "./PersonnelSpendingRequestPage.css";

const PersonnelSpendingRequestPage = () => {
  const [isCreateButtonClicked, setIsCreateButtonClicked] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { spendingRequests, handleCancelRequest } = useContext(PersonnelPageSpendingAPIContext);

  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCreateButtonClick = (e) => {
    e.preventDefault();
    setIsCreateButtonClicked(true);
  };

  const handleSpendingCancel = (e, id) => {
    e.preventDefault();
    const confirmation = window.confirm(
      "Are you sure to cancel your spending request?"
    );
    if (confirmation) {
      handleCancelRequest(id);
    }
  };

  const handleFileChange = (e) => {
    e.preventDefault();
    const selectedFile = e.target.value;
    setSelectedFile(selectedFile);
    setIsDropdownOpen(false);
    setIsModalOpen(true);
  };

 
  const handleModalClose = () => {
    setIsModalOpen(false);
    setIsDropdownOpen(false); 
  };

  const renderModalContent = () => {
    return (
      <div className="spending-modal">
        <div className="spending-modal-content">
          <span className="close" onClick={handleModalClose}>&times;</span>
          <div className="spending-file-img-container">
            <img src={selectedFile} alt="Selected File" />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="personnel-spending-request-page-container">
      <h2>You can find information about the expenditure request below..</h2>
      <div className="personnel-spending-page-upper">
        <strong>Spending Requests</strong>
        <button onClick={handleCreateButtonClick}>Create Request</button>
      </div>
      {isCreateButtonClicked && (
        <div
          className="edit-info-background"
          onClick={() => setIsCreateButtonClicked(false)}
        >
          <div
            className="edit-info-content"
            onClick={(e) => e.stopPropagation()}
          >
            <PersonnelSpendingRequestForm />
          </div>
        </div>
      )}
      {isModalOpen && (
        <div className="edit-info-background">
          <div className="edit-info-content" onClick={(e) => e.stopPropagation()}>
            <div className="spending-file-img-container">
              {renderModalContent()}
            </div>
          </div>
        </div>
      )}
      <div className="personnel-spending-page-bottom">
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Request Date</th>
              <th>Request Reason</th>
              <th>Request Description</th>
              <th>Request Amount</th>
              <th>Request Currency</th>
              <th>Request Spending Date</th>
              <th>Request Files</th>
              <th>Request Status</th>
              <th>Request UpdatedAt</th>
            </tr>
          </thead>
          <tbody>
            {spendingRequests.map((request, index) => (
              <tr key={index} className={request.requestStatus}>
                <td>{index + 1}</td>
                <td>{request.createdAt}</td>
                <td>{request.reason}</td>
                <td>{request.description}</td>
                <td>{request.amount}</td>
                <td>{request.currency}</td>
                <td>{request.spendingDate}</td>
                <td ref={dropdownRef}>
                      <select
                        value={selectedFile || "Select the file to be shown"}
                        onChange={handleFileChange}
                        className="dropdown-menu"
                      >
                        <option disabled>Select the file to be shown</option>
                        {request.attachments.map((file, index) => (
                          <option key={index} value={file}>
                            {file}
                          </option>
                        ))}
                      </select>
                </td>
                <td>{request.requestStatus}</td>
                <td>
                  {request.requestStatus === "PENDING" ? (
                    <button
                      className="cancel-spending-request-button"
                      onClick={(e) => handleSpendingCancel(e, request.id)}
                    >
                      Cancel Request
                    </button>
                  ) : (
                    request.updatedAt
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PersonnelSpendingRequestPage;
