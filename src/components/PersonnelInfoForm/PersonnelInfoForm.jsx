import { useContext, useState, useEffect } from "react";
import "./PersonnelInfoForm.css";
import { AuthContext } from "../../context/AuthContext";
import EditMyInfoForm from "../EditMyInfoForm/EditMyInfoForm";
import { PersonnelPageAPIContext } from "../../context/PersonalPageAPIContext";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const PersonnelInfoForm = () => {
  const [isEditInfoClicked, setIsEditInfoClicked] = useState(false);
  const { isAuthenticated } = useContext(AuthContext);
  const { personnel } = useContext(PersonnelPageAPIContext);
  const [holidays, setHolidays] = useState([]);

  useEffect(() => {
    const mockHolidays = [
      {
        name: "New Year's Day",
        startDate: "2024-01-01",
        endDate: "2024-01-01",
      },
      {
        name: "Labor Day",
        startDate: "2024-05-01",
        endDate: "2024-05-01",
      },
      {
        name: "Independence Day",
        startDate: "2024-07-04",
        endDate: "2024-07-04",
      },
      {
        name: "Christmas Day",
        startDate: "2024-12-25",
        endDate: "2024-12-25",
      },
    ];

    setHolidays(mockHolidays);
  }, []);

  // useEffect(() => {
  //   const fetchHolidays = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:9095/api/v1/company/holidays');
  //       setHolidays(response.data);
  //     } catch (error) {
  //       console.error('Error fetching holidays:', error);
  //     }
  //   };

  //   fetchHolidays();
  // }, []);

  const handleEditInfoClick = (e) => {
    e.preventDefault();
    setIsEditInfoClicked(true);
  };

  return (
    <div className="personnel-page-container">
      <main className="personnel-page-main" id="main">
        <section className="personnel-page-main-section">
          <h1>
            Welcome to the MUSKEETERS HR System Management, {personnel.name} !
          </h1>
          <br />
          <h4>
            You can view your profile, your company information and create a
            comment for your company... Also you can ask for dayoff, spending or
            advance requests to your supervisor...
          </h4>
        </section>
      </main>
      <div className="personnel-container">
        <div className="personnel-photo">
          <img src={personnel.image}></img>
        </div>
        <div className="personnel-info">
          <p>
            <strong>Name:</strong> {personnel.name} {personnel.lastName}
          </p>
          <p>
            <strong>Email:</strong> {personnel.email}
          </p>
          <p>
            <strong>Phone:</strong> {personnel.phones[0].phoneType}
            {": "}
            {personnel.phones[0].phoneNumber}
          </p>
              <p>
                <strong>Salary:</strong> {personnel.salary}
              </p>
          <p>
            <strong>Department:</strong> {personnel.department.name}
          </p>
          {isAuthenticated.role === "PERSONNEL" && (
            <>
              <p>
                <strong>Shift:</strong> {personnel.department.shiftHour}
              </p>
              <p>
                <strong>Break:</strong> {personnel.department.breakHour}
              </p>
              <p>
                <strong>DayOff Quota:</strong> {personnel.dayOff}
              </p>
            </>
          )}
          <div className="btn-container">
            <button
              className="edit-info-button"
              onClick={(e) => handleEditInfoClick(e)}
            >
              Edit My Info
            </button>
            {isEditInfoClicked && (
              <div
                className="edit-info-background"
                onClick={() => setIsEditInfoClicked(false)}
              >
                <div
                  className="edit-info-content"
                  onClick={(e) => e.stopPropagation()}
                >
                  <EditMyInfoForm />
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="personnel-company-info-container">
          <div className="personnel-company-summary">
            <div className="personnel-company-img-and-company-name">
              <img src={personnel.companyLogo} />
              <div className="personnel-company-name">
                <strong>Company Name:</strong>
                <p>{personnel.companyName}</p>
              </div>
            </div>
            <div className="personnel-company-data">
              <div className="personnel-hrinfo-container">
              <strong>HR Infos:</strong>
                {personnel.hrInfos.map((hrInfo) => (
                  <div>
                    <p key={hrInfo.email}>Mail:{hrInfo.email}</p>
                    <p key={hrInfo.phone}>Phone:{hrInfo.phone}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="calendar-container">
        <Calendar
          className="holiday-calendar"
          value={new Date()}
          tileContent={({ date }) => {
            const holiday = holidays.find(
              (holiday) =>
                new Date(holiday.startDate).toDateString() ===
                date.toDateString()
            );
            return holiday ? (
              <div className="holiday-day">{holiday.name}</div>
            ) : null;
          }}
        />
      </div>
    </div>
  );
};

export default PersonnelInfoForm;
