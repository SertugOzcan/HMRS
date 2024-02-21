import React from "react";
import "./SupervisorCard.css"
const SupervisorCard = ({ supervisor }) => {
  return (
    <div className="supervisor-card">
      <img src={supervisor.image} alt="" />
      <div className="supervisor-card-texts">
        <p>name : {supervisor.name}</p>
        <p>surname :{supervisor.lastName}</p>
        <p>gender :{supervisor.gender}</p>
        {supervisor.phones && supervisor.phones.length > 0 && (
          <p>
            phone: {supervisor.phones[0].phoneType} -{" "}
            {supervisor.phones[0].phoneNumber}
          </p>
        )}
      </div>
    </div>
  );
};

export default SupervisorCard;
