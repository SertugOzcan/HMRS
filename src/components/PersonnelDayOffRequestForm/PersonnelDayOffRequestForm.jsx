import { useContext, useState } from "react";
import "./PersonnelDayOffRequestForm.css";
import ReactDatePicker from "react-datepicker";
import { PersonnelPageDayOffAPIContext } from "../../context/PersonnelPageDayOffAPIContext";

const PersonnelDayOffRequestForm = () => {
  const [reason, setReason] = useState("");
  const [dayoffDescription, setDayoffDescription] = useState("");
  const [dayoffStartDate, setDayoffStartDate] = useState();
  const [dayoffEndDate, setDayoffEndDate] = useState();
  const { handleSubmit } = useContext(PersonnelPageDayOffAPIContext);

  const handleReasonChange = (e) => {
    setReason(e.target.value);
  };

  const handleDayOffSubmit = () => {
    const payload = {
        reason: reason,
        description: dayoffDescription,
        startDate: dayoffStartDate,
        endDate: dayoffEndDate
    }
    handleSubmit(payload);
  }

  return (
    <form className="personnel-day-off-request-form" onSubmit={handleDayOffSubmit}>
      <div className="personnel-day-off-request-reason">
        <strong>DayOff Reason</strong>
        <select value={reason} onChange={handleReasonChange}>
          <option value="Annual Leave">Annual Leave</option>
          <option value="Sick Leave">Sick Leave</option>
          <option value="Maternity/Paternity Leave">
            Maternity/Paternity Leave
          </option>
          <option value="Educational Leave">Educational Leave</option>
          <option value="Marriage Leave">Marriage Leave</option>
        </select>
      </div>
      <div className="personnel-day-off-request-description">
        <input
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
            placeholderText="Start Date"
            selectsStart
            selected={dayoffStartDate}
            onChange={(date) => setDayoffStartDate(date)}
            startDate={dayoffStartDate}
          />
        </div>
        <div className="date-picker-wrapper">
          <ReactDatePicker
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
      <button type="submit">Submit DayOff Request</button>
    </form>
  );
};

export default PersonnelDayOffRequestForm;
