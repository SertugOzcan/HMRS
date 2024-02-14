import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "./RegisterPage.css";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

const RegisterPage = () => {
  const [isManager, setIsManager] = useState(false);

  const [name, setName] = useState("");
  const [surName, setSurName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [gender, setGender] = useState(false);

  const [address, setAddress] = useState(""); // Changed 'adress' to 'address'
  const [companyName, setCompanyName] = useState("");
  const [identityNumber,setIdentityNumber] = useState("");

  const [identityNumberError,setIdentityNumberError]=useState("");
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
    if(isManager){
      const textarea = document.getElementById("address");
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";
    }
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
    if (password !== rePassword) {
      setPasswordError("Passwords do not match");
      return;
    }
    if(identityNumber.length!=11){
      setIdentityNumberError("Identity number must be 11 character");
      return;
    }
    try {
      const stringGender = gender ? 'FEMALE' : 'MALE'
      const payload = {
        name: name.trim(),
        surName: surName.trim(),
        email: email.trim(),
        password: password,
        rePassword: rePassword,
        identityNumber: identityNumber,
        dateOfBirth: date,
        phone: phone,
        gender: stringGender,
        address: address,
        companyName: companyName.trim()
      } 
      if(!isManager){
        const response = await axios.post('http://localhost:9090/api/v1/auth/register-guest',payload);
        const data = response.data
        console.log(data);
        }else{
          const response = await axios.post('http://localhost:9090/api/v1/auth/register-supervisor',payload);
        const data = response.data
        console.log(data);
        } 
    } catch (error) {
      console.error('Registration error:', error);
    }
  };
  


  return (
    <div className="register-page-major-container">
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
            value={surName}
            onChange={(e) => setSurName(e.target.value)}
            required
          />
          {isManager && (
            <input
              type="text"
              placeholder="Company Name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              required
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e)=>setPhone(e.target.value)} />
          <input
            type="password"
            spellCheck="false"
            className="control"
            placeholder="Password"
            value={password}
            onChange={handleChange}
            required
          />
          <div className={`bars ${strength}`}></div>
          <div className="strength">{strength && `${strength} password`}</div>
          <input
            type="password"
            placeholder="Re-enter Password"
            value={rePassword}
            onChange={(e) => setRePassword(e.target.value)}
            required
          />
          {passwordError && <p className="error-message">{passwordError}</p>}
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
          <input type="text" className="identity-number" 
          value={identityNumber}
          onChange={(e) => setIdentityNumber(e.target.value)}
          placeholder="Identity Number"
          required/>
          {identityNumberError && <p className="error-message">{identityNumberError}</p>}
          {isManager && (<textarea
            id="address"
            name="address"
            placeholder="Your Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />)}
          <div className="date-picker">
          <div className="dob-label"><label >Birthday:</label></div>
            <div className="dob-input">
              <DatePicker
                dateFormat="dd/MM/yyyy"
                selected={date}
                onChange={(date) => setDate(date)}
              />
            </div>
          </div>
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
    </div>
  );
};

export default RegisterPage;
