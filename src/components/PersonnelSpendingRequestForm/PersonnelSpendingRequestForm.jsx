import { useContext, useState } from "react";
import "./PersonnelSpendingRequestForm.css";
import ReactDatePicker from "react-datepicker";
import { PersonnelPageSpendingAPIContext } from "../../context/PersonnelPageSpendingAPIContext";

const PersonnelSpendingRequestForm = () => {
  const [reason, setReason] = useState("A");
  const [spendingDescription, setSpendingDescription] = useState("");
  const [spendingAmount, setSpendingAmount] = useState();
  const [spendingCurrency, setSpendingCurrency] = useState("TL");
  const [spendingDate, setSpendingDate] = useState();
  const [spendingAttachments, setSpendingAttachments] = useState([]);
  const { handleSubmit } = useContext(PersonnelPageSpendingAPIContext);

  const handleReasonChange = (e) => {
    setReason(e.target.value);
  };

  const handleCurrencyChange = (e) => {
    setSpendingCurrency(e.target.value);
  };

  const handleAttachmentsChange = (e) => {
    const files = Array.from(e.target.files);
    setSpendingAttachments(files);
  }

  const handleSpendingSubmit = (e) => {
    e.preventDefault();
    const newRequest = {
        reason: reason,
        description: spendingDescription,
        amount: spendingAmount,
        currency: spendingCurrency,
        spendingDate: spendingDate,
    }
    handleSubmit(newRequest, spendingAttachments);
  }

  return (
    <form className="personnel-spending-request-form">
      <div className="personnel-spending-request-reason">
        <strong>Spending Reason</strong>
        <select value={reason} onChange={handleReasonChange}>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="D">D</option>
          <option value="E">E</option>
        </select>
      </div>
      <div className="personnel-spending-request-description">
        <input
          type="text"
          className="spending-request-description"
          value={spendingDescription}
          onChange={(e) => setSpendingDescription(e.target.value)}
          placeholder="Description"
          required
        />
      </div>
      <div className="personnel-spending-request-amount">
        <input
          type="number"
          className="spending-request-amount"
          value={spendingAmount}
          onChange={(e) => setSpendingAmount(e.target.value)}
          placeholder="Amount"
          required
        />
      </div>
      <div className="personnel-spending-request-currency">
        <strong>Currency</strong>
        <select value={spendingCurrency} onChange={handleCurrencyChange}>
          <option value="TL">TL</option>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
        </select>
      </div>
      <div className="date-picker-wrapper">
          <ReactDatePicker
            placeholderText="Spending Date"
            selected={spendingDate}
            onChange={(date) => setSpendingDate(date)}
            maxDate={Date.now()}
          />
      </div>
      <div className="personnel-spending-request-attachments">
        <input
          type="file"
          className="spending-request-attachments"
          onChange={handleAttachmentsChange}
          multiple
        />
      </div>
      <button onClick={handleSpendingSubmit}>Submit Spending Request</button>
    </form>
  );
};

export default PersonnelSpendingRequestForm;