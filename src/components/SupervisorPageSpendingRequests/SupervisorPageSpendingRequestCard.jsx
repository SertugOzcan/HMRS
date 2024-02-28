import { useContext,useState,useEffect,useRef } from "react";
import { SupervisorPageSpendingAPIContext } from "../../context/SupervisorPageSpendingAPIContext";
import "./SupervisorPageSpendingRequestCard.css";
const SupervisorPageSpendingRequestCard = ({ request }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { handleSpendingDecision } = useContext(
    SupervisorPageSpendingAPIContext
  );

  const handleSpendingDecisionConfirmation = (e, id, decision) => {
    e.preventDefault();
    let confirmation;
    if (decision === "ACCEPTED") {
      confirmation = window.confirm(
        "Are you sure to accept spending request of this personnel?"
      );
    } else {
      confirmation = window.confirm(
        "Are you sure to decline spending request of this personnel?"
      );
    }
    if (confirmation) {
      handleSpendingDecision(id, decision);
    }
  };
  const handleFileChange = (e) => {
    e.preventDefault();
    const selectedFile = e.target.value;
    setSelectedFile(selectedFile);
    setIsDropdownOpen(false);
    setIsModalOpen(true);
  };
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

  const handleModalClose = () => {
    setIsModalOpen(false);
    setIsDropdownOpen(false);
  };

  const renderModalContent = () => {
    return (
      <div className="spending-modal">
        <div className="spending-modal-content">
          <span className="close" onClick={handleModalClose}>
            &times;
          </span>
          <div className="spending-file-img-container">
            <img src={selectedFile} alt="Selected File" />
          </div>
        </div>
      </div>
    );
  };
  return (
    <div
      className={`spending-request-card-container supervisor-${request.requestStatus}`}
    >
      <div className="spending-request-card-img">
        <img src={request.image} alt="Personnel Image" />
      </div>
      <div className="spending-request-card-body">
        <div className="spending-request-card-data-div">
          <h3>NAME</h3>
          <p>
            {request.name} {request.lastName}
          </p>
        </div>
        <div className="spending-request-card-data-div">
          <h3>REQUEST DATE</h3>
          <p>{request.createdAt}</p>
        </div>
        <div className="spending-request-card-data-div">
          <h3>REASON</h3>
          <p>{request.reason}</p>
        </div>
        <div className="spending-request-card-data-div">
          <h3>DESCRIPTION</h3>
          <p>{request.description}</p>
        </div>
        <div className="spending-request-card-data-div">
          <h3>AMOUNT</h3>
          <p>{request.amount}</p>
        </div>
        <div className="spending-request-card-data-div">
          <h3>SPENDING FILES</h3>
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
        </div>
        <div className='advance-request-card-data-div'>
          <h3>STATUS</h3>
          <p>{request.requestStatus}</p>
        </div>
        {request.requestStatus === "PENDING" ? (
          <div className="spending-request-card-buttons">
            <button
              className="spending-request-accept-button"
              onClick={(e) =>
                handleSpendingDecisionConfirmation(e, request.id, "ACCEPTED")
              }
            >
              Accept
            </button>
            <button
              className="spending-request-decline-button"
              onClick={(e) =>
                handleSpendingDecisionConfirmation(e, request.id, "DECLINED")
              }
            >
              Decline
            </button>
          </div>
        ) : (
          <div className="spending-request-card-data-div">
            <h3>UPDATED AT</h3>
            <p>{request.updatedAt}</p>
          </div>
        )}
      </div>
      {isModalOpen && (
        <div className="edit-info-background">
          <div className="edit-info-content" onClick={(e) => e.stopPropagation()}>
            <div className="spending-file-img-container">
              {renderModalContent()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupervisorPageSpendingRequestCard;
