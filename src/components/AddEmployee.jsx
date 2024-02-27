import { useContext, useState } from "react";
import { SupervisorPageAPIContext } from "../context/SupervisorPageAPIContext";
import "./AddEmployee.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddEmployeeForm = () => {
  const { handleAddEmployee, companyData } = useContext(
    SupervisorPageAPIContext
  );

  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState(false);
  const [department, setDepartment] = useState("");
  const [identityNumber, setIdentityNumber] = useState("");
  const [address, setAddress] = useState("");

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

      const newEmployee = {
        name: name.trim(),
        lastName: lastName.trim(),
        gender: gender ? "FEMALE" : "MALE",
        identityNumber: identityNumber.trim(),
        email: email.trim(),
        image: gender
          ? "https://i.imgur.com/BNXkMgI.png"
          : "https://i.imgur.com/ltRBj9D.png",
        address: address.trim(),
        phone: phone.trim(),
        departmentId: department.trim(),
        dateOfEmployment: dateOfEmployment,
        dateOfBirth: dateOfBirth,
        salary: salary.trim(),
      };

      handleAddEmployee(newEmployee);
    }
  };

  return (
    <>
      <h3 className="add_employee_name">Add Employee</h3>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <input
            className="add_employee_input"
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            required
          />
          <input
            className="add_employee_input"
            type="text"
            name="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
            required
          />
          <input
            className="add_employee_input"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            className="add_employee_input"
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
                className="addemp_gender_input"
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
                className="addemp_gender_input"
                type="radio"
                name="radio"
                value="female"
                checked={gender}
                onChange={() => setGender(true)}
              />
              <span className="gender-span">Female</span>
            </label>
          </div>
          <select
            className="add_employee_input"
            name="department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            required
          >
            <option value="">Select Department</option>
            {companyData.departments.map((department) => (
              <option key={department.name} value={department.name}>
                {department.name}
              </option>
            ))}
          </select>
          <input
            className="add_employee_input"
            type="text"
            name="identityNumber"
            value={identityNumber}
            onChange={(e) => setIdentityNumber(e.target.value)}
            placeholder="Identity Number"
            required
          />
          <textarea
            className="add_employee_textarea"
            id="address"
            name="address"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />

          <input
            className="add_employee_input"
            type="number"
            name="salary"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            placeholder="Salary"
            required
          />
          <label className="addemp_dob">Date of Birth: </label>
          <DatePicker
            className="add_employee_input"
            placeholderText="Date of Birth"
            required
            dateFormat="dd/MM/yyyy"
            selected={dateOfBirth}
            onChange={(date) => {
              if (
                date < new Date(Date.now() - 100 * 365 * 24 * 60 * 60 * 1000) ||
                date > new Date()
              ) {
                alert(
                  "Please select a date within the last 100 years and today."
                );
              } else {
                setDateOfBirth(date);
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
          <br />
          <label className="addemp_doe"> Date of Employment: </label>
          <DatePicker
            selected={dateOfEmployment}
            onChange={(date) => {
              if (
                date < new Date(Date.now() - 100 * 365 * 24 * 60 * 60 * 1000) ||
                date > new Date()
              ) {
                alert(
                  "Please select a date within the last 100 years and today."
                );
              } else {
                dateOfEmployment(date);
              }
            }}
            minDate={new Date(Date.now() - 100 * 365 * 24 * 60 * 60 * 1000)}
            maxDate={new Date()}
            showYearDropdown
            scrollableYearDropdown
            yearDropdownItemNumber={100}
            showMonthDropdown
            scrollableMonthYearDropdown
            className="add_employee_input"
            dateFormat="dd/MM/yyyy"
            placeholderText="Date of Employment"
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
    </>
  );
};

export default AddEmployeeForm;
