import { useContext, useState } from "react";
import "./PersonnelAdvanceRequestForm.css";
import { PersonnelPageAdvanceAPIContext } from "../../context/PersonnelPageAdvanceAPIContext";

const PersonnelAdvanceRequestForm = () => {
  // const [reason, setReason] = useState("A");
  const [advanceDescription, setAdvanceDescription] = useState("");
  const [advanceAmount, setAdvanceAmount] = useState();
  const { handleSubmit } = useContext(PersonnelPageAdvanceAPIContext);

  // const handleReasonChange = (e) => {
  //   setReason(e.target.value);
  // };

  const handleAdvanceSubmit = (e) => {
    e.preventDefault();
    const newRequest = {
        // reason: reason,
        description: advanceDescription,
        amount: advanceAmount
    }
    handleSubmit(newRequest);
  }

  return (
    <form className="personnel-advance-request-form">
      {/* <h1>Advance Request Form</h1><br />
      <div className="personnel-advance-request-reason">
        <strong>Advance Reason</strong>
        <select value={reason} onChange={handleReasonChange}>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="D">D</option>
          <option value="E">E</option>
        </select>
      </div> */}
      <div className="personnel-advance-request-description">
        <textarea
          type="text"
          className="advance-request-description"
          value={advanceDescription}
          onChange={(e) => setAdvanceDescription(e.target.value)}
          placeholder="Description"
          required
        />
      </div>
      <div className="personnel-advance-request-amount">
        <input
          type="number"
          className="advance-request-amount"
          value={advanceAmount}
          onChange={(e) => setAdvanceAmount(e.target.value)}
          placeholder="Amount"
          required
        />
      </div>
      <button onClick={handleAdvanceSubmit}>Submit Advance Request</button>
    </form>
  );
};

export default PersonnelAdvanceRequestForm;
