import React, { useContext } from "react";
import { useState } from "react";
import { PersonnelPageDayOffAPIContext } from "../../context/PersonnelPageDayOffAPIContext";
import "./PersonnelDayOffPage.css";
const PersonnelDayOffPage = () => {
  const [isCreateButtonClicked, setIsCreateButtonClicked] = useState(false);

  const { pendingDayOffRequests, notPendingDayOffRequests } = useContext(
    PersonnelPageDayOffAPIContext
  );

  const handleCreateButtonClick = () => {
    setIsCreateButtonClicked(true);
  };

  const calculateDuration = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
  
    const durationInDays = Math.floor((end - start) / (24 * 60 * 60 * 1000));
  
    return durationInDays;
  };

  return (
    <div className="personnel-day-off-page-container">
      <div className="personnel-day-off-page-upper">
        <strong>DayOff Requests</strong>
        <button onClick={handleCreateButtonClick}>Create Request</button>
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
            {pendingDayOffRequests.map((request, index) => (
              <tr key={index} className={request.requestStatus}>
                <td>{index+1}</td>
                <td>{request.createdAt}</td>
                <td>{request.reason}</td>
                <td>{request.description}</td>
                <td>{request.startDate}</td>
                <td>{request.endDate}</td>
                <td>{calculateDuration(request.startDate, request.endDate)}</td>
                <td>{request.requestStatus}</td>
                <td>{<button className="cancel-day-off-request-button">Cancel Request</button>}</td>
              </tr>
            ))}
            {notPendingDayOffRequests.map((request, index) => (
              <tr key={index} className={request.requestStatus}>
                <td>{index+1}</td>
                <td>{request.createdAt}</td>
                <td>{request.reason}</td>
                <td>{request.description}</td>
                <td>{request.startDate}</td>
                <td>{request.endDate}</td>
                <td>{calculateDuration(request.startDate, request.endDate)}</td>
                <td>{request.requestStatus}</td>
                <td>{request.updatedAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PersonnelDayOffPage;
