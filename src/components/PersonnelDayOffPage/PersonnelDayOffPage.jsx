import { useContext, useEffect, useState } from "react";
import { PersonnelPageDayOffAPIContext } from "../../context/PersonnelPageDayOffAPIContext";
import "./PersonnelDayOffPage.css";
import PersonnelDayOffRequestForm from "../PersonnelDayOffRequestForm/PersonnelDayOffRequestForm";
const PersonnelDayOffPage = () => {
  const [isCreateButtonClicked, setIsCreateButtonClicked] = useState(false);

  const { dayOffRequests, handleCancelRequest } = useContext(PersonnelPageDayOffAPIContext);

  const [availableDayOffCount, setAvailableDayOffCount] = useState();

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

  useEffect(() => {
    const calculateAvailableDayOffQuota = () => {
      const initialQuota = 14;
      if (dayOffRequests.length === 0) {
        setAvailableDayOffCount(initialQuota);
      } else {
        const totalSpentDayOffDuration = dayOffRequests.reduce((spentDayOffQuota, request) => {
          if (request.requestStatus === "ACCEPTED") {
            return spentDayOffQuota + calculateDuration(request.startDate, request.endDate);
          }
          return spentDayOffQuota;
        }, 0);
        const remainingQuota = initialQuota - totalSpentDayOffDuration;
        setAvailableDayOffCount(remainingQuota);
      }
    };

    calculateAvailableDayOffQuota();
  }, [dayOffRequests]);

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
      <h2>Welcome to the Day Off Request Page!</h2>
      {availableDayOffCount !== null && (
        <h3>
          Explore and view your day off requests. Your current quota is: {availableDayOffCount}{" "}
          {availableDayOffCount !== 1 && availableDayOffCount !== 0 && availableDayOffCount !== -1
            ? "days"
            : "day"}
        </h3>
      )}
      <br />
      <p>Here, you can check your current day off quota and manage your day off requests. If your request is approved or rejected by the manager, the status will be updated here. Additionally, you will be notified via email about the decision.</p>
      <div className="personnel-day-off-page-upper">
        <strong>Your Day Off Requests History:</strong>
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
