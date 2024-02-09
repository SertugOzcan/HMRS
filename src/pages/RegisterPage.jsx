import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "./RegisterPage.css";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

const RegisterPage = () => {
  const [isManager, setIsManager] = useState(false);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [adress, setAdress] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    axios
      .post("http://localhost:9090/api/v1/auth/register-guest")
      .then((response) => response.data)
      .then((data) => {
        setName(data.financialData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);



  
  // ****************** Adres alanının boyutunu ayarlamak ******************
  useEffect(() => {
    adjustTextareaHeight();
  }, [adress]);

  const adjustTextareaHeight = () => {
    const textarea = document.getElementById("address");
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  };





  const handleRegister = (e) => {
    e.preventDefault();
    if (password !== repassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    console.log("Registering...");
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Surname"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Re-enter Password"
          value={repassword}
          onChange={(e) => setRepassword(e.target.value)}
          required
        />
        <textarea
          id="address"
          name="address"
          placeholder="Adres"
          value={adress}
          onChange={(e) => setAdress(e.target.value)}
          
          required
        />
        <div className="date-picker">
          <DatePicker
            dateFormat={"dd/MM/yyyy"}
            selected={date}
            onChange={(date) => setDate(date)}
            placeholderText="Date of Birth"
          />
        </div>
        {passwordError && <p className="error-message">{passwordError}</p>}
        {isManager && (
          <>
            <input
              type="text"
              placeholder="Company Name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              required
            />
          </>
        )}
        <button type="submit">Register</button>
      </form>
      <div className="role-selector">
        <label>
          <input
            type="radio"
            value="visitor"
            checked={!isManager}
            onChange={() => setIsManager(false)}
          />
          Visitor
        </label>
        <label>
          <input
            type="radio"
            value="manager"
            checked={isManager}
            onChange={() => setIsManager(true)}
          />
          Manager
        </label>
      </div>
    </div>
  );
};

export default RegisterPage;
