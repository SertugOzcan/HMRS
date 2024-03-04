import { useContext, useEffect, useState} from "react";
import PersonnelAdvanceRequestForm from "../PersonnelAdvanceRequestForm/PersonnelAdvanceRequestForm";
import "./PersonnelAdvancePage.css";
import { PersonnelPageAdvanceAPIContext } from "../../context/PersonnelPageAdvanceAPIContext";
const PersonnelAdvancePage = () => {
  const [isCreateButtonClicked, setIsCreateButtonClicked] = useState(false);

  const { advanceRequests, handleCancelRequest } = useContext(PersonnelPageAdvanceAPIContext);

  const [availableAdvanceQuota, setAvailableAdvanceQuota] = useState();

  const handleCreateButtonClick = (e) => {
    e.preventDefault();
    setIsCreateButtonClicked(true);
  };

  const handleAdvanceCancel = (e, id) => {
    e.preventDefault();
    const confirmation = window.confirm("Are you sure to cancel your advance request?");
    if(confirmation) {
      handleCancelRequest(id);
    }
  }

  useEffect(() => {
    const calculateAvailableAdvanceQuota = () => {
      const initialQuota = 50000;
      if (advanceRequests.length === 0) {
        setAvailableAdvanceQuota(initialQuota);
      } else {
        const totalSpentAdvanceDuration = advanceRequests.reduce((spentAdvanceQuota, request) => {
          if (request.requestStatus === "ACCEPTED") {
            return spentAdvanceQuota + request.amount;
          }
          return spentAdvanceQuota;
        }, 0);
        const remainingQuota = initialQuota - totalSpentAdvanceDuration;
        setAvailableAdvanceQuota(remainingQuota);
      }
    };

    calculateAvailableAdvanceQuota();
  }, [advanceRequests]);

  return (
    // SERTUĞA NOT: btn-container, edit-info-background,edit-info-content cssleri ayrıştırılabilir...
    <div className="personnel-advance-page-container">
      <h2>Welcome to the Advance Request Page!</h2>
      {availableAdvanceQuota !== null && (
        <h3>
          Explore and view your advance requests. Your current quota is: {availableAdvanceQuota} TL
        </h3>
      )}
      <br />
      <p>Here, you can check your current advance quota and manage your advance requests. If your request is approved or rejected by the manager, the status will be updated here. Additionally, you will be notified via email about the decision.</p>
      <div className="personnel-advance-page-upper">
        <strong>Your Advance Requests History:</strong>
        <div className="btn-container">
          <button onClick={(e) => handleCreateButtonClick(e)}>Create Request</button>
          {isCreateButtonClicked && (
              <div
                className="edit-info-background"
                onClick={() => setIsCreateButtonClicked(false)}
              >
                <div
                  className="edit-info-content"
                  onClick={(e) => e.stopPropagation()}
                >
                <PersonnelAdvanceRequestForm />
                </div>
              </div>
          )}
        </div>
      </div>
      <div className="personnel-advance-page-bottom">
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Request Date</th>
              <th>Request Description</th>
              <th>Request Amount</th>
              <th>Request Status</th>
              <th>Request UpdatedAt</th>
            </tr>
          </thead>
          <tbody>
            {advanceRequests.map((request, index) => (
              <tr key={index} className={request.requestStatus}>
                <td>{index+1}</td>
                <td>{request.createdAt}</td>
                <td>{request.description}</td>
                <td>{request.amount}</td>
                <td>{request.requestStatus}</td>
                <td>{request.requestStatus==='PENDING' ? <button className="cancel-advance-request-button" onClick={(e) => handleAdvanceCancel(e,request.id)}>Cancel Request</button> : request.updatedAt }</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PersonnelAdvancePage;
