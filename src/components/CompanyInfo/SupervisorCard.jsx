import React from "react";
import "./SupervisorCard.css"
const SupervisorCard = ({ supervisor }) => {
  return (
    <div className="supervisor-card">
      <h3>PERSONNEL</h3>
      <div className="supervisor-card-second-container">
        <img src={supervisor.image} alt="" />
        <div className="supervisor-card-texts">
          <p>Name : <span>{supervisor.name}</span></p>
          <p>Surname : <span>{supervisor.lastName}</span></p>
          <p>Gender : <span>{supervisor.gender}</span></p>
          {supervisor.phones && supervisor.phones.length > 0 && (
            <p>
              phone: <span>{supervisor.phones[0].phoneType} -{" "}
              {supervisor.phones[0].phoneNumber}</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SupervisorCard;
