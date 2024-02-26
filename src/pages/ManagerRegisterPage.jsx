import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

import "./ManagerRegisterPage.css";

const ManagerRegisterPage = () => {
  const [name, setName] = useState("");
  const [surName, setSurName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [gender, setGender] = useState(false);
  const [address, setAddress] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [identityNumber, setIdentityNumber] = useState("");
  const [isRegisterFirstTime, setIsRegisterFirstTime] = useState(false);
  const [identityNumberError, setIdentityNumberError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [date, setDate] = useState(new Date());
  const [strength, setStrength] = useState("");
  const [message, setMessage] = useState("");
  const [visible, setVisible] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [currency, setCurrency] = useState("TL");
  const [selectedPackage, setSelectedPackage] = useState("");

  const defaultPackageCosts = {
    basic: 30000,
    silver: 60000,
    gold: 90000
  }
  const exchangeRates = {
    TL: 1,
    USD: 0.032,
    EUR: 0.030
  };

  const [packages, setPackages] = useState([]);
  useEffect(() => {
    const updatedPackages = [
      { name: "Basic", duration: 30, cost: defaultPackageCosts.basic * exchangeRates[currency]},
      { name: "Silver", duration: 60, cost: defaultPackageCosts.silver * exchangeRates[currency]},
      { name: "Gold", duration: 90, cost: defaultPackageCosts.gold * exchangeRates[currency]}
    ];
    setPackages(updatedPackages);
  }, [currency])


  // useEffect(() => {
  //   updatePackagePrices();
  // }, [currency]);

  // const updatePackagePrices = () => {


  //   const updatedPackages = packages.map(pkg => {
  //     const updatedCost = pkg.cost * exchangeRates[currency];
  //     return { ...pkg, cost: updatedCost };
  //   });

  //   setPackages(updatedPackages);
  // };

  const handlePackageChange = packageName => {
    setSelectedPackage(packageName);
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [address]);

  const adjustTextareaHeight = () => {
    const textarea = document.getElementById("address");
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";
    }
  };

  const getStrength = password => {
    let indicator = 0;

    if (/[a-z]/.test(password)) indicator++;
    if (/[A-Z]/.test(password)) indicator++;
    if (/\d/.test(password)) indicator++;
    if (/[^a-zA-Z0-9]/.test(password)) indicator++;
    if (password.length >= 16) indicator++;

    return ["empty", "weak", "medium", "strong"][indicator];
  };

  const handleChange = e => {
    const newPassword = e.target.value;
    setStrength(getStrength(newPassword));
    setPassword(newPassword);
  };

  const handleCurrencyChange = e => {
    setCurrency(e.target.value);
  };

  const handleRegister = async e => {
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
      setIdentityNumberError("Identity number must be 11 characters");
      hasError = true;
    }

    if (phone.length !== 11) {
      setPhoneNumberError("Phone number must be 11 characters");
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
        address: address,
        identityNumber: identityNumber,
        dateOfBirth: date,
        gender: stringGender,
        phone: phone,
        companyName: companyName.trim(),
        isCompanyFirstRegistration: isRegisterFirstTime,
        contractName: selectedPackage,
        contractDuration:
          selectedPackage === "Basic"
            ? 30
            : selectedPackage === "Silver"
            ? 60
            : 90,
        contractCost: packages.find(pkg => pkg.name === selectedPackage).cost,
        contractCurrency: currency
      };

      const response = await axios.post(
        "http://localhost:9090/api/v1/auth/register-supervisor",
        payload
      );

      console.log(response);
      setMessage("Registration successful!");
      setIsSuccess(true);

      // Reset form fields
      setName("");
      setSurName("");
      setEmail("");
      setPhone("");
      setPassword("");
      setRePassword("");
      setGender(false);
      setAddress("");
      setCompanyName("");
      setIdentityNumber("");
      setDate(new Date());
      setStrength("");
      setPasswordError("");
      setIdentityNumberError("");
    } catch (error) {
      console.error("Registration error:", error);
      setPasswordError("");
      setIdentityNumberError("");
      setPhoneNumberError("");
      setMessage(error.response.data.message || "Registration failed!");
      setIsSuccess(false);
    }

    setVisible(true);

    setTimeout(() => {
      setVisible(false);
    }, 4000);
  };


  return (
    <div className="manager-register-page">
      <div className={`manager-register-container`}>
        <h2>Manager Register</h2>
        <form onSubmit={handleRegister}>
          <div className="left-form">
            <input
            className="manager-register-input"
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
            className="manager-register-input"
              type="text"
              placeholder="Surname"
              value={surName}
              onChange={(e) => setSurName(e.target.value)}
              required
            />
            <input
            className="manager-register-input"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
            className="manager-register-input"
              type="text"
              placeholder="Company Name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              required
            />
            <input
            className="manager-register-input"
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
              className="manager-register-input"
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
              className="manager-register-input"
              placeholder="Password"
              value={password}
              onChange={handleChange}
              required
            />
            <input
            className="manager-register-input"
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
            <div className="dob-label-manager">
              <label>Date of Birth:</label>
            </div>
            <div className="dob-input-manager">
              <DatePicker
                placeholderText="Birthday"
                dateFormat="dd/MM/yyyy"
                selected={date}
                onChange={(date) => setDate(date)}
              />
            </div>
            <div className="gender-selector-manager">
              <label className="gender-label-manager">
                <input
                className="gender-manager"
                  type="radio"
                  name="radio"
                  value="male"
                  checked={!gender}
                  onChange={() => setGender(false)}
                />
                <span>Male</span>
              </label>
              <label className="gender-label-manager">
                <input
                className="gender-manager"
                  type="radio"
                  name="radio"
                  value="female"
                  checked={gender}
                  onChange={() => setGender(true)}
                />
                <span className="gender-span-manager">Female</span>
              </label>
            </div>
            <textarea
            className="manager-register-input"
              id="address"
              name="address"
              placeholder="Your Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div className="right-form">
            <select value={currency} onChange={handleCurrencyChange}>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="TL">TL</option>
            </select>
            <div className="package-selection">
              <input
                type="checkbox"
                id="isRegisteredFirstTime"
                checked={isRegisterFirstTime}
                onChange={() => setIsRegisterFirstTime(!isRegisterFirstTime)}
              />
              <label htmlFor="isRegisteredFirstTime">Is Registered First Time?</label>
              {isRegisterFirstTime && (
                <div className="package-options">
                  {packages.map((pkg) => (
                    <div key={pkg.name} className={`package-card package-card-${pkg.name.toLowerCase()}`}>
                      <input
                        type="radio"
                        id={pkg.name}
                        name="package"
                        value={pkg.name}
                        checked={selectedPackage === pkg.name}
                        onChange={() => handlePackageChange(pkg.name)}
                      />
                      <label htmlFor={pkg.name}>
                        <h3>{pkg.name}</h3>
                        <p>Duration: {pkg.duration} days</p>
                        <p>Cost: {pkg.cost} {currency}</p>
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <button className="register_manager_button" type="submit">Register</button>
        </form>
        <div className={`registration-message ${visible ? "show" : ""} ${isSuccess ? "success" : "error"}`}>
          {message}
        </div>
      </div>
    </div>
  );
};

export default ManagerRegisterPage;