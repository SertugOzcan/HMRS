// RegisterPage.jsx
import { useState } from "react";
import DatePicker from "react-datepicker";
import "./RegisterPage.css";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { Link } from "react-router-dom";

const RegisterPage = () => {
 
  

  const [name, setName] = useState("");
  const [surName, setSurName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [gender, setGender] = useState(false);

 
  
  const [identityNumber, setIdentityNumber] = useState("");

  const [identityNumberError, setIdentityNumberError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [date, setDate] = useState(new Date());
  const [strength, setStrength] = useState("");

  const [message, setMessage] = useState("");
  const [visible, setVisible] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // -------------------PASWORD STRENGHT--------------------------
  const getStrength = (password) => {
    let indicator = 0;

    if (/[a-z]/.test(password)) indicator++;
    if (/[A-Z]/.test(password)) indicator++;
    if (/\d/.test(password)) indicator++;
    if (/[^a-zA-Z0-9]/.test(password)) indicator++;
    if (password.length >= 16) indicator++;

    return ["empty", "weak", "medium", "strong"][indicator];
  };

  const handleChange = (e) => {
    const newPassword = e.target.value;
    setStrength(getStrength(newPassword));
    setPassword(newPassword);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setPasswordError("");
    setIdentityNumberError("");
    setPhoneNumberError("");
    let hasError = false;

    if (password !== rePassword) {
      setPasswordError("Passwords do not match");
      hasError = true;
    }

    if (identityNumber.length !== 11) {
      setIdentityNumberError("Identity number must be 11 character");
      hasError = true;
    }

    if (phone.length !== 11) {
      setPhoneNumberError("Phone number must be 11 character");
      hasError = true;
    }

    if (hasError) {
      return;
    }

    try {
      const stringGender = gender ? "FEMALE" : "MALE";
      const payload = {
        name: name.trim(),
        surName: surName.trim(),
        email: email.trim(),
        password: password,
        rePassword: rePassword,
        
        identityNumber: identityNumber,
        dateOfBirth: date,
        gender: stringGender,
        phone: phone,
      
        
    
      };
      
      const response = await axios.post(
        "http://localhost:80/auth/register-guest",
        payload
      );
      
      console.log(response);
      setMessage("Registration successful!");
      setIsSuccess(true);

      // Resetting the form fields
      // setName("");
      // setSurName("");
      // setEmail("");
      // setPhone("");          // FINAL VERSIYONUNDA OLACAK...
      // setPassword("");
      // setRePassword("");
      // setGender(false);
      // setIdentityNumber("");
      // setAddress("");
      // setCompanyName("");
      // setDate(new Date());
      // setStrength("");
      // setPasswordError("");
      // setIdentityNumberError("");
    } catch (error) {
      console.error("Registration error:", error);
      setPasswordError("");
      setIdentityNumberError("");
      setPhoneNumberError("");
      setMessage(error.response.data.message); // setMessage("Registration failed!")
      setIsSuccess(false);
    }

    setVisible(true);

    setTimeout(() => {
      setVisible(false);
    }, 4000);
  };

  return (
    <div className="register-page-major-container">
      <div className={"register-container"}>
        <h2>Register</h2>
        <div className="role-selector"></div>


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
              value={surName}
              onChange={(e) => setSurName(e.target.value)}
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
              type="text"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            {phoneNumberError && (
              <p className="registration-error-messages">{phoneNumberError}</p>
            )}
            <input
              type="text"
              className="identity-number"
              value={identityNumber}
              onChange={(e) => setIdentityNumber(e.target.value)}
              placeholder="Identity Number"
              required
            />
            {identityNumberError && (
              <p className="registration-error-messages">
                {identityNumberError}
              </p>
            )}
          
            <input
              type="password"
              spellCheck="false"
              className="control"
              placeholder="Password"
              value={password}
              onChange={handleChange}
              required
            />

            <input
              type="password"
              placeholder="Re-enter Password"
              value={rePassword}
              onChange={(e) => setRePassword(e.target.value)}
              required
            />
            {passwordError && (
              <p className="registration-error-messages">{passwordError}</p>
            )}

            <div className={`bars ${strength}`}></div>
            <div className="strength">{strength && `${strength} password`}</div>
          
          
            <div className="dob-label">
              <label>Date of Birth:</label>
            </div>
            <div className="dob-input">
            <DatePicker
                placeholderText="Birthday"
                dateFormat="dd/MM/yyyy"
                selected={date}
                onChange={(date) => {
                  if (
                    date <
                      new Date(Date.now() - 100 * 365 * 24 * 60 * 60 * 1000) ||
                    date > new Date()
                  ) {
                    alert(
                      "Please select a date within the last 100 years and today."
                    );
                  } else {
                    setDate(date);
                  }
                }}
                minDate={new Date(Date.now() - 100 * 365 * 24 * 60 * 60 * 1000)}
                maxDate={new Date()}
                showYearDropdown
                scrollableYearDropdown
                yearDropdownItemNumber={100}
                showMonthDropdown
                scrollableMonthYearDropdown
              />
            

            <div className="gender-selector">
              <label className="gender-label">
                <input
                  type="radio"
                  name="radio"
                  value="male"
                  checked={!gender}
                  onChange={() => setGender(false)}
                />
                <span>Male</span>
              </label>
              <label className="gender-label">
                <input
                  type="radio"
                  name="radio"
                  value="female"
                  checked={gender}
                  onChange={() => setGender(true)}
                />
                <span className="gender-span">Female</span>
              </label>
            </div>
          </div>

          <button className="register_guest_button" type="submit">Register</button>
        </form>

        <div
          className={`registration-message-guest ${visible ? "show" : ""} ${
            isSuccess ? "success" : "error"
          }`}
        >
          {message}
        </div>
        <Link className="manager_link" to="/manager-register">
        <button className="button_go_manager_register">
  Supervisor Register
  <svg fill="currentColor" viewBox="0 0 24 24" className="icon">
    <path clipRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z" fillRule="evenodd"></path>
  </svg>
</button>
        </Link>
      </div>
    </div>
  );
};

export default RegisterPage;
