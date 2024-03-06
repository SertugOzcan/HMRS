import { useContext, useState } from "react";
import "./PersonnelSpendingRequestForm.css";
import ReactDatePicker from "react-datepicker";
import { PersonnelPageSpendingAPIContext } from "../../context/PersonnelPageSpendingAPIContext";

const PersonnelSpendingRequestForm = () => {
  const [reason, setReason] = useState("TRAVEL");
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
    if(spendingDescription.trim() === "") {
      alert("Please add description for your spending request!");
      return;
    }
    if(!spendingAmount) {
      alert("Please add amount for your spending request!");
      return;
    }
    if(!/^\d+$/.test(spendingAmount)) {
      alert("Amount can only be digits!");
      return;
    }
    if(!spendingDate) {
      alert("Please check your request date!");
      return;
    }
    const newRequest = {
        reason: reason,
        description: spendingDescription.trim(),
        amount: spendingAmount,
        currency: spendingCurrency,
        spendingDate: spendingDate,
    }
    handleSubmit(newRequest, spendingAttachments);
  }

  return (
    <form className="personnel-spending-request-form">
      <h1>Spending Request Form</h1><br />
      <div className="personnel-spending-request-reason">
        <strong className="spending_strong">Spending Reason</strong>
        <select value={reason} onChange={handleReasonChange}>
          <option value="TRAVEL">Travel Expense</option>
          <option value="TRAINING">Training Expense</option>
          <option value="OFFICE">Office Supplies Expense</option>
          <option value="HEALTH">Health Expense</option>
          <option value="ADVERTISING">Advertising Expense</option>
        </select>
      </div>
      <div className="personnel-spending-request-description">
        <textarea
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
      <div className="spending-date-picker-wrapper">
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
      <button className="spend_button" onClick={handleSpendingSubmit}>Submit Spending Request</button>
    </form>
  );
};

export default PersonnelSpendingRequestForm;
