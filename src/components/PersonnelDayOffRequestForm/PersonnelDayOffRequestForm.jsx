import { useContext, useState } from "react";
import "./PersonnelDayOffRequestForm.css";
import ReactDatePicker from "react-datepicker";
import { PersonnelPageDayOffAPIContext } from "../../context/PersonnelPageDayOffAPIContext";

const PersonnelDayOffRequestForm = () => {
  const [reason, setReason] = useState("ANNUAL");
  const [dayoffDescription, setDayoffDescription] = useState("");
  const [dayoffStartDate, setDayoffStartDate] = useState();
  const [dayoffEndDate, setDayoffEndDate] = useState();
  const { handleSubmit } = useContext(PersonnelPageDayOffAPIContext);

  const handleReasonChange = (e) => {
    setReason(e.target.value);
  };

  const handleDayOffSubmit = (e) => {
    e.preventDefault();
    const newRequest = {
        reason: reason,
        description: dayoffDescription,
        startDate: dayoffStartDate,
        endDate: dayoffEndDate
    }
    handleSubmit(newRequest);
  }

  return (
    <form className="personnel-day-off-request-form">
      <h1>Day Off Request Form</h1><br />
      <div className="personnel-day-off-request-reason">
        <strong>DayOff Reason</strong>
        <select value={reason} onChange={handleReasonChange}>
          <option value="ANNUAL">Annual Leave</option>
          <option value="SICK">Sick Leave</option>
          <option value="MATERNITY">Maternity Leave</option>
          <option value="PATERNITY">Paternity Leave</option>
          <option value="EDUCATIONAL">Educational Leave</option>
          <option value="MARRIAGE">Marriage Leave</option>
        </select>
      </div>
      <div className="personnel-day-off-request-description">
        <textarea
          type="text"
          className="day-off-request-description"
          value={dayoffDescription}
          onChange={(e) => setDayoffDescription(e.target.value)}
          placeholder="Description"
          required
        />
      </div>
      <div className="personnel-day-off-request-dates">
        <div className="date-picker-wrapper">
          <ReactDatePicker
          className="dayOff_datePicker"
          wrapperClassName="dayOff_wrapper"
          
            placeholderText="Start Date"
            popperClassName="dayOff_popper"
            selectsStart
            selected={dayoffStartDate}
            onChange={(date) => setDayoffStartDate(date)}
            startDate={dayoffStartDate}
          />
        </div>
        <div className="date-picker-wrapper">
          <ReactDatePicker
          className="dayOff_datePicker"
            wrapperClassName="dayOff_wrapper"
            popperClassName="dayOff_popper"
            placeholderText="End Date"
            selectsEnd
            selected={dayoffEndDate}
            onChange={(date) => setDayoffEndDate(date)}
            endDate={dayoffEndDate}
            startDate={dayoffStartDate}
            minDate={dayoffStartDate}
          />
        </div>
      </div>
      <button className="dayOff_button" onClick={handleDayOffSubmit}>Submit DayOff Request</button>
    </form>
  );
};

export default PersonnelDayOffRequestForm;
