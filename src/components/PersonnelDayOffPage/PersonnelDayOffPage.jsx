import { useContext, useState } from "react";
import { PersonnelPageDayOffAPIContext } from "../../context/PersonnelPageDayOffAPIContext";
import "./PersonnelDayOffPage.css";
import PersonnelDayOffRequestForm from "../PersonnelDayOffRequestForm/PersonnelDayOffRequestForm";
const PersonnelDayOffPage = () => {
  const [isCreateButtonClicked, setIsCreateButtonClicked] = useState(false);

  const { dayOffRequests, handleCancelRequest } = useContext(PersonnelPageDayOffAPIContext);

  const handleCreateButtonClick = (e) => {
    e.preventDefault();
    setIsCreateButtonClicked(true);
  };

  const calculateDuration = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
  
    const durationInDays = Math.floor((end - start) / (24 * 60 * 60 * 1000) + 1);
  
    return durationInDays;
  };

  const handleDayOffCancel = (e, id) => {
    e.preventDefault();
    const confirmation = window.confirm("Are you sure to cancel your day off request?");
    if(confirmation) {
      handleCancelRequest(id);
    }
  }

  return (
    // SERTUĞA NOT: btn-container, edit-info-background,edit-info-content cssleri ayrıştırılabilir...
    <div className="personnel-day-off-page-container">
      <h2>You can find information about your request days below..</h2>
      <div className="personnel-day-off-page-upper">
        <strong>DayOff Requests</strong>
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
                  <PersonnelDayOffRequestForm />
                </div>
              </div>
          )}
        </div>
      </div>
      <div className="personnel-day-off-page-bottom">
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Request Date</th>
              <th>Request Reason</th>
              <th>Request Description</th>
              <th>Request Start Date</th>
              <th>Request End Date</th>
              <th>Request Duration</th>
              <th>Request Status</th>
              <th>Request UpdatedAt</th>
            </tr>
          </thead>
          <tbody>
            {dayOffRequests.map((request, index) => (
              <tr key={index} className={request.requestStatus}>
                <td>{index+1}</td>
                <td>{request.createdAt}</td>
                <td>{request.reason}</td>
                <td>{request.description}</td>
                <td>{request.startDate}</td>
                <td>{request.endDate}</td>
                <td>{calculateDuration(request.startDate, request.endDate)}</td>
                <td>{request.requestStatus}</td>
                <td>{request.requestStatus==='PENDING' ? <button className="cancel-day-off-request-button" onClick={(e) => handleDayOffCancel(e,request.id)}>Cancel Request</button> : request.updatedAt }</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PersonnelDayOffPage;
