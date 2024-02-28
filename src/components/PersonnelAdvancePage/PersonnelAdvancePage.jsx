import { useContext, useState} from "react";
import PersonnelAdvanceRequestForm from "../PersonnelAdvanceRequestForm/PersonnelAdvanceRequestForm";
import "./PersonnelAdvancePage.css";
import { PersonnelPageAdvanceAPIContext } from "../../context/PersonnelPageAdvanceAPIContext";
const PersonnelAdvancePage = () => {
  const [isCreateButtonClicked, setIsCreateButtonClicked] = useState(false);

  const { advanceRequests, handleCancelRequest } = useContext(PersonnelPageAdvanceAPIContext);

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

  return (
    // SERTUĞA NOT: btn-container, edit-info-background,edit-info-content cssleri ayrıştırılabilir...
    <div className="personnel-advance-page-container">
      <div className="personnel-advance-page-upper">
        <strong>Advance Requests</strong>
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
              {/* <th>Request Reason</th> */}
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
                {/* <td>{request.reason}</td> */}
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
