import React, { useContext, useState } from "react";
import { SupervisorPageAPIContext } from "../context/SupervisorPageAPIContext";
import "./AddEmployee.css";

const AddEmployeeForm = () => {
  const { handleAddEmployee } = useContext(SupervisorPageAPIContext);

  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState(false);
  const [department, setDepartment] = useState("");
  const [identityNumber, setIdentityNumber] = useState("");
  const [address, setAddress] = useState("");
  const [img, setImg] = useState("");
  const [salary, setSalary] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [dateOfEmployment, setDateOfEmployment] = useState(new Date());

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      name.trim() &&
      lastName.trim() &&
      email.trim() &&
      phone.trim() &&
      identityNumber.trim() &&
      address.trim() &&
    //   img.trim() &&
      salary.trim() &&
      department.trim()
    ) {
      if (identityNumber.length !== 11) {
        alert("Check personnel's identity number!");
        return;
      }
      if (phone.length !== 11) {
        alert("Check personnel's phone number!");
        return;
      }
      let newImg;
      if(img === "") {
        newImg = (gender ? "https://i.imgur.com/BNXkMgI.png" : "https://i.imgur.com/ltRBj9D.png");
      } else {
        newImg = img.trim();
      }

      const newEmployee = {
        name: name.trim(),
        lastName: lastName.trim(),
        gender: gender ? "Female" : "Male",
        identityNumber: identityNumber.trim(),
        email: email.trim(),
        image: newImg,
        address: address.trim(),
        phone: phone.trim(),
        departmentId: department.trim(),
        dateOfEmployment: dateOfEmployment,
        dateOfBirth: dateOfBirth,
        salary: salary.trim(),
      };
        console.log("GÖNDERİLEN PERSONEL PAYLOAD: ", newEmployee);
        handleAddEmployee(newEmployee);          
    }
    };

  return (
    <div className="form-container">
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
      />
      <input
        type="text"
        name="lastName"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        placeholder="Last Name"
        required
      />
      <input
        type="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="tel"
        name="phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Phone"
        required
      />
      <div className="gender-selectorr">
        <label className="gender-labell">
          <input
            type="radio"
            name="radio"
            value="male"
            checked={!gender}
            onChange={() => setGender(false)}
          />
          <span>Male</span>
        </label>
        <label className="gender-labell">
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
      <input
        type="text"
        name="department"
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
        placeholder="Department"
        required
      />
      <input
        type="text"
        name="identityNumber"
        value={identityNumber}
        onChange={(e) => setIdentityNumber(e.target.value)}
        placeholder="Identity Number"
        required
      />
      <textarea
        id="address"
        name="address"
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        required
      />
      <input
        type="text"
        name="img"
        value={img}
        onChange={(e) => setImg(e.target.value)}
        placeholder="Image URL"
      />
      <input
        type="number"
        name="salary"
        value={salary}
        onChange={(e) => setSalary(e.target.value)}
        placeholder="Salary"
        required
      />
      <label>Date of Birth: </label>
      <input
        type="date"
        name="dateOfBirth"
        value={dateOfBirth}
        onChange={(e) => setDateOfBirth(e.target.value)}
        required
      />{" "}
      <br />
      <label> Date of Employment:  </label>
      <input
        type="date"
        name="dateOfEmployment"
        value={dateOfEmployment}
        onChange={(e) => setDateOfEmployment(e.target.value)}
        required
      />
      <br />
      <button className="button_addemp" type="submit">
        <span className="button__text_addemp">Add Employee</span>
        <span className="button__icon_addemp">
          <svg
            className="svg"
            fill="none"
            height="24"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line x1="12" x2="12" y1="5" y2="19"></line>
            <line x1="5" x2="19" y1="12" y2="12"></line>
          </svg>
        </span>
      </button>
    </form>
    </div>
  );
};

export default AddEmployeeForm;
