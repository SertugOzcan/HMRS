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
  const [gender, setGender] = useState(false);

  const [address, setAddress] = useState(""); // Changed 'adress' to 'address'
  const [companyName, setCompanyName] = useState("");


  const [passwordError, setPasswordError] = useState("");
  const [date, setDate] = useState(new Date());
  const [strength, setStrength] = useState(""); // Added state for password strength

  // Fetch data from the server when the component mounts
  // useEffect(() => {
  //   axios
  //     .post("http://localhost:9090/api/v1/auth/register-guest")
  //     .then((response) => response.data)
  //     .then((data) => {
  //       setName(data.financialData);
  //       console.log(data);
  //     })
  //     .catch((error) => console.error("Error fetching data:", error));
  // }, []);



  // Adjust textarea height dynamically
  useEffect(() => {
    adjustTextareaHeight();
  }, [address]);

  
  const adjustTextareaHeight = () => {
    const textarea = document.getElementById("address");
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  };
// ---------------------------------------------



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

// ---------------------------------------------




  const handleChange = (e) => {
    const newPassword = e.target.value;
    setStrength(getStrength(newPassword));
    setPassword(newPassword);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== repassword) {
      setPasswordError("Passwords do not match");
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:9090/api/v1/auth/register-guest', {
        name,
        surname,
        email,
        password,
        address,
        dateOfBirth: date,
        // Diğer isteğe dahil edilmesi gereken verileri ekleyin
      });
  
      console.log(response.data); // Yanıtı konsola yazdırabilirsiniz, başka bir işlem de yapabilirsiniz.
    } catch (error) {
      console.error('Registration error:', error);
    }
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
          spellCheck="false"
          className="control"
          placeholder="Password"
          value={password}
          onChange={handleChange}
          required
        />
        <div className={`bars ${strength}`}><div></div></div>
        <div className="strength">{strength && `${strength} password`}</div>
        <input
          type="password"
          placeholder="Re-enter Password"
          value={repassword}
          onChange={(e) => setRepassword(e.target.value)}
          required
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



        <textarea
          id="address"
          name="address"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <div className="date-picker">
          <DatePicker
            dateFormat="dd/MM/yyyy"
            selected={date}
            onChange={(date) => setDate(date)}
            placeholderText="Date of Birth"
          />
        </div>
        {passwordError && <p className="error-message">{passwordError}</p>}
        {isManager && (
          <input
            type="text"
            placeholder="Company Name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
          />
        )}
        <button type="submit">Register</button>
      </form>
      <div className="role-selector">
        
        <label>
          <input
            type="radio"
            value="visitor"
            name="radio"
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
