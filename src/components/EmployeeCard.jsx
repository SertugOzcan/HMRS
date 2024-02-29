/* eslint-disable react/prop-types */
import "./EmployeeCard.css";

const EmployeeCard = ({ personnel }) => {
  return (
    <div className="card" style={{ width: "18rem" }}>
      <div className="supervisor-page-employee-cards">
        <img src={personnel.image} alt="personnel-image"/>
      </div>

      <div className="card-body">
        <div>
          <h5 className="card-title">
            {personnel.name} {personnel.lastName}
          </h5>

          <p className="card-text">{personnel.email}</p>
          <p className="card-text">Phone: {personnel.phones[0].phoneNumber}</p>
          <p className="card-text">Salary: {personnel.salary}</p>
          <p className="card-text">DayOff: {personnel.dayOff}</p>
        </div>
      </div>
    </div>
  );
};

export default EmployeeCard;
