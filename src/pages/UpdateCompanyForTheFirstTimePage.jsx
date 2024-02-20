import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SupervisorPageAPIContext } from "../context/SupervisorPageAPIContext";
import { AuthContext } from "../context/AuthContext";
import "./UpdatedCompanyForTheFirstTimePage.css";

const UpdateCompanyForTheFirstTimePage = () => {
  const { companyData } = useContext(SupervisorPageAPIContext);
  const { isAuthenticated } = useContext(AuthContext);

  const [establishmentDate, setEstablishmentDate] = useState("");
  const [companyLogo, setCompanyLogo] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [hrInfoList, setHrInfoList] = useState([]);
  const [companyDepartments, setCompanyDepartments] = useState([]);
  const [companyHolidays, setCompanyHolidays] = useState([]);
  const [companyIncomes, setCompanyIncomes] = useState([]);
  const [companyExpenses, setCompanyExpenses] = useState([]);

  const [hrInfoName, setHRInfoName] = useState("");
  const [hrInfoSurname, setHRInfoSurname] = useState("");
  const [hrInfoEmail, setHRInfoEmail] = useState("");
  const [hrInfoPhone, setHRInfoPhone] = useState("");

  const [departmentName, setDepartmentName] = useState("");
  const [departmentShifts, setDepartmentShifts] = useState("");
  const [departmentBreaks, setDepartmentBreaks] = useState("");

  const [holidayName, setHolidayName] = useState("");
  const [holidayDuration, setHolidayDuration] = useState(0);

  const [incomeDescription, setIncomeDescription] = useState("");
  const [incomeAmount, setIncomeAmount] = useState(0);

  const [expenseDescription, setExpenseDescription] = useState("");
  const [expenseAmount, setExpenseAmount] = useState(0);

  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState("coreInfo");
  const handlePageChange = (pageName) => {
    setCurrentPage(pageName);
    document.getElementById(pageName).scrollIntoView({ behavior: "smooth" });
  };

  const handleAddHRInfo = (e) => {
    e.preventDefault();
    setHrInfoList((prevhrinfolist) => [
      ...prevhrinfolist,
      {
        firstName: hrInfoName,
        lastName: hrInfoSurname,
        email: hrInfoEmail,
        phone: hrInfoPhone,
      },
    ]);
    setHRInfoName("");
    setHRInfoSurname("");
    setHRInfoEmail("");
    setHRInfoPhone("");
  };

  const handleAddDepartment = (e) => {
    e.preventDefault();
    setCompanyDepartments((prevDepartments) => [
      ...prevDepartments,
      {
        name: departmentName,
        shifts: departmentShifts,
        breaks: departmentBreaks,
      },
    ]);
    setDepartmentName("");
    setDepartmentShifts("");
    setDepartmentBreaks("");
  };

  const handleAddHoliday = (e) => {
    e.preventDefault();
    setCompanyHolidays((prevHolidays) => [
      ...prevHolidays,
      {
        name: holidayName,
        duration: holidayDuration,
      },
    ]);
    setHolidayName("");
    setHolidayDuration("");
  };

  const handleAddIncome = (e) => {
    e.preventDefault();
    setCompanyIncomes((prevIncomes) => [
      ...prevIncomes,
      {
        description: incomeDescription,
        amount: incomeAmount,
      },
    ]);
    setIncomeDescription("");
    setIncomeAmount(0);
  };

  const handleAddExpense = (e) => {
    e.preventDefault();
    setCompanyExpenses((prevExpenses) => [
      ...prevExpenses,
      {
        description: expenseDescription,
        amount: expenseAmount,
      },
    ]);
    setExpenseDescription("");
    setExpenseAmount(0);
  };

  const handleSubmit = async () => {
    const payload = {
      token: isAuthenticated.token,
      establishmentDate: establishmentDate,
      companyLogo: companyLogo,
      address: companyAddress,
      hrInfos: hrInfoList,
      departments: companyDepartments,
      holidays: companyHolidays,
      incomes: companyIncomes,
      expenses: companyExpenses,
    };
    console.log(payload);
    const response = await axios.put(
      "http://localhost:9095/api/v1/company/update-for-first-time",
      payload
    );
    console.log(response);
    if (response === true) {
      navigate("/yonetici-page");
    }
  };

  return (
    <div className="update-company-page">
      <div className="sidebar">
        <button onClick={() => handlePageChange("coreInfo")}>Core Info</button>
        <button onClick={() => handlePageChange("hrInfo")}>HR Info</button>
        <button onClick={() => handlePageChange("department")}>
          Department
        </button>
        <button onClick={() => handlePageChange("holiday")}>Holiday</button>
        <button onClick={() => handlePageChange("incomeExpense")}>
          Income & Expense
        </button>
      </div>
      <div className="update-company-form">
        <div id="coreInfo" className="section">
          <h2>Core Info</h2>

          <div className="company-core-info">
            <label className="company-name-header">{companyData.companyName}</label>
            <input
              type="text"
              name="establishment-date"
              id="establishment-date"
              value={establishmentDate}
              onChange={(event) => setEstablishmentDate(event.target.value)}
              placeholder="Establishment Date"
              required
            />
            <input
              type="text"
              name="company-logo"
              id="company-logo"
              value={companyLogo}
              onChange={(event) => setCompanyLogo(event.target.value)}
              placeholder="Company Logo URL"
              required
            />
            <input
              type="text"
              name="company-address"
              id="company-address"
              value={companyAddress}
              onChange={(event) => setCompanyAddress(event.target.value)}
              placeholder="Company Address"
              required
            />
          </div>
        </div>
        {/* HR Info form alanı buraya eklenecek */}
        <div id="hrInfo" className="section">
          <h2>HR Info</h2>
          <div className="hr-info-list-container">
            <div className="hr-info-container">
              <div className="hr-info-name">
                <input
                  className="input"
                  placeholder="Name"
                  type="text"
                  value={hrInfoName}
                  onChange={(event) => setHRInfoName(event.target.value)}
                  required
                />
              </div>
              <div className="hr-info-surname">
                <input
                  className="input"
                  placeholder="Surname"
                  type="text"
                  value={hrInfoSurname}
                  onChange={(event) => setHRInfoSurname(event.target.value)}
                  required
                />
              </div>
              <div className="hr-info-email">
                <input
                  className="input"
                  placeholder="Email"
                  type="text"
                  value={hrInfoEmail}
                  onChange={(event) => setHRInfoEmail(event.target.value)}
                  required
                />
              </div>
              <div className="hr-info-phone">
                <input
                  className="input"
                  placeholder="Phone"
                  type="text"
                  value={hrInfoPhone}
                  onChange={(event) => setHRInfoPhone(event.target.value)}
                  required
                />
              </div>
            </div>
            <button className="buttonas" onClick={handleAddHRInfo}>
              <div className="buttonas-box">
                <span className="buttonas-elem">
                  <svg viewBox="0 0 46 40" xmlns="http://www.w3.org/2000/svg">
                    <path d="M46 20.038c0-.7-.3-1.5-.8-2.1l-16-17c-1.1-1-3.2-1.4-4.4-.3-1.2 1.1-1.2 3.3 0 4.4l11.3 11.9H3c-1.7 0-3 1.3-3 3s1.3 3 3 3h33.1l-11.3 11.9c-1 1-1.2 3.3 0 4.4 1.2 1.1 3.3.8 4.4-.3l16-17c.5-.5.8-1.1.8-1.9z"></path>
                  </svg>
                </span>
                <span className="buttonas-elem">
                  <svg viewBox="0 0 46 40">
                    <path d="M46 20.038c0-.7-.3-1.5-.8-2.1l-16-17c-1.1-1-3.2-1.4-4.4-.3-1.2 1.1-1.2 3.3 0 4.4l11.3 11.9H3c-1.7 0-3 1.3-3 3s1.3 3 3 3h33.1l-11.3 11.9c-1 1-1.2 3.3 0 4.4 1.2 1.1 3.3.8 4.4-.3l16-17c.5-.5.8-1.1.8-1.9z"></path>
                  </svg>
                </span>
              </div>
            </button>
            {/* HR Info list display */}
          </div>
        </div>
        {/* Diğer formlar buraya eklenecek */}
        {/* Department, Holiday, Income & Expense */}
        <div id="department" className="section">
          <h2>Department</h2>
          <div className="company-department-list-container">
            <div className="company-department-container">
              <div className="department-name">
                <input
                  className="input"
                  placeholder="Department Name"
                  type="text"
                  value={departmentName}
                  onChange={(event) => setDepartmentName(event.target.value)}
                  required
                />
              </div>
              <div className="department-shifts">
                <input
                  className="input"
                  placeholder="Shifts"
                  type="text"
                  value={departmentShifts}
                  onChange={(event) => setDepartmentShifts(event.target.value)}
                  required
                />
              </div>
              <div className="department-breaks">
                <input
                  className="input"
                  placeholder="Breaks"
                  type="text"
                  value={departmentBreaks}
                  onChange={(event) => setDepartmentBreaks(event.target.value)}
                  required
                />
              </div>
            </div>
            <button className="buttonas" onClick={handleAddDepartment}>
              <div className="buttonas-box">
                <span className="buttonas-elem">
                  <svg viewBox="0 0 46 40" xmlns="http://www.w3.org/2000/svg">
                    <path d="M46 20.038c0-.7-.3-1.5-.8-2.1l-16-17c-1.1-1-3.2-1.4-4.4-.3-1.2 1.1-1.2 3.3 0 4.4l11.3 11.9H3c-1.7 0-3 1.3-3 3s1.3 3 3 3h33.1l-11.3 11.9c-1 1-1.2 3.3 0 4.4 1.2 1.1 3.3.8 4.4-.3l16-17c.5-.5.8-1.1.8-1.9z"></path>
                  </svg>
                </span>
                <span className="buttonas-elem">
                  <svg viewBox="0 0 46 40">
                    <path d="M46 20.038c0-.7-.3-1.5-.8-2.1l-16-17c-1.1-1-3.2-1.4-4.4-.3-1.2 1.1-1.2 3.3 0 4.4l11.3 11.9H3c-1.7 0-3 1.3-3 3s1.3 3 3 3h33.1l-11.3 11.9c-1 1-1.2 3.3 0 4.4 1.2 1.1 3.3.8 4.4-.3l16-17c.5-.5.8-1.1.8-1.9z"></path>
                  </svg>
                </span>
              </div>
            </button>
            {/* Department list display */}
          </div>
        </div>

        <div id="holiday" className="section">
          <h2>Holiday</h2>
          <div className="company-holiday-list-container">
            <div className="company-holiday-container">
              <div className="holiday-name">
                <input
                  className="input"
                  placeholder="Holiday Name"
                  type="text"
                  value={holidayName}
                  onChange={(event) => setHolidayName(event.target.value)}
                  required
                />
              </div>
              <div className="holiday-duration">
                <label>Holiday Duration:</label>
                <input
                  className="input"
                  type="number"
                  value={holidayDuration}
                  onChange={(event) => setHolidayDuration(event.target.value)}
                  required
                />
              </div>
            </div>
            <button className="buttonas" onClick={handleAddHoliday}>
              <div className="buttonas-box">
                <span className="buttonas-elem">
                  <svg viewBox="0 0 46 40" xmlns="http://www.w3.org/2000/svg">
                    <path d="M46 20.038c0-.7-.3-1.5-.8-2.1l-16-17c-1.1-1-3.2-1.4-4.4-.3-1.2 1.1-1.2 3.3 0 4.4l11.3 11.9H3c-1.7 0-3 1.3-3 3s1.3 3 3 3h33.1l-11.3 11.9c-1 1-1.2 3.3 0 4.4 1.2 1.1 3.3.8 4.4-.3l16-17c.5-.5.8-1.1.8-1.9z"></path>
                  </svg>
                </span>
                <span className="buttonas-elem">
                  <svg viewBox="0 0 46 40">
                    <path d="M46 20.038c0-.7-.3-1.5-.8-2.1l-16-17c-1.1-1-3.2-1.4-4.4-.3-1.2 1.1-1.2 3.3 0 4.4l11.3 11.9H3c-1.7 0-3 1.3-3 3s1.3 3 3 3h33.1l-11.3 11.9c-1 1-1.2 3.3 0 4.4 1.2 1.1 3.3.8 4.4-.3l16-17c.5-.5.8-1.1.8-1.9z"></path>
                  </svg>
                </span>
              </div>
            </button>
            {/* Holiday list display */}
          </div>
        </div>

        <div id="incomeExpense" className="section">
          <h2>Income & Expense</h2>
          <div className="company-income-list-container">
            <div className="company-income-container">
              <div className="income-description">
                <input
                  className="input"
                  placeholder="Income Description"
                  type="text"
                  value={incomeDescription}
                  onChange={(event) => setIncomeDescription(event.target.value)}
                  required
                />
              </div>
              <div className="income-amount">
                <label>Income Amount:</label>
                <input
                  className="input"
                  placeholder="Income Amount"
                  type="number"
                  value={incomeAmount}
                  onChange={(event) => setIncomeAmount(event.target.value)}
                  required
                />
              </div>
            </div>
            <button className="buttonas" onClick={handleAddIncome}>
              <div className="buttonas-box">
                <span className="buttonas-elem">
                  <svg viewBox="0 0 46 40" xmlns="http://www.w3.org/2000/svg">
                    <path d="M46 20.038c0-.7-.3-1.5-.8-2.1l-16-17c-1.1-1-3.2-1.4-4.4-.3-1.2 1.1-1.2 3.3 0 4.4l11.3 11.9H3c-1.7 0-3 1.3-3 3s1.3 3 3 3h33.1l-11.3 11.9c-1 1-1.2 3.3 0 4.4 1.2 1.1 3.3.8 4.4-.3l16-17c.5-.5.8-1.1.8-1.9z"></path>
                  </svg>
                </span>
                <span className="buttonas-elem">
                  <svg viewBox="0 0 46 40">
                    <path d="M46 20.038c0-.7-.3-1.5-.8-2.1l-16-17c-1.1-1-3.2-1.4-4.4-.3-1.2 1.1-1.2 3.3 0 4.4l11.3 11.9H3c-1.7 0-3 1.3-3 3s1.3 3 3 3h33.1l-11.3 11.9c-1 1-1.2 3.3 0 4.4 1.2 1.1 3.3.8 4.4-.3l16-17c.5-.5.8-1.1.8-1.9z"></path>
                  </svg>
                </span>
              </div>
            </button>
            {/* Income list display */}
          </div>
          <div className="company-expense-list-container">
            <div className="company-expense-container">
              <div className="expense-description">
                <input
                  className="input"
                  placeholder="Expense Description"
                  type="text"
                  value={expenseDescription}
                  onChange={(event) =>
                    setExpenseDescription(event.target.value)
                  }
                  required
                />
              </div>
              <div className="expense-amount">
                <label>Expense Amount:</label>
                <input
                  className="input"
                  placeholder="Expense Amount"
                  type="number"
                  value={expenseAmount}
                  onChange={(event) => setExpenseAmount(event.target.value)}
                  required
                />
              </div>
            </div>
            <button className="buttonas" onClick={handleAddExpense}>
              <div className="buttonas-box">
                <span className="buttonas-elem">
                  <svg viewBox="0 0 46 40" xmlns="http://www.w3.org/2000/svg">
                    <path d="M46 20.038c0-.7-.3-1.5-.8-2.1l-16-17c-1.1-1-3.2-1.4-4.4-.3-1.2 1.1-1.2 3.3 0 4.4l11.3 11.9H3c-1.7 0-3 1.3-3 3s1.3 3 3 3h33.1l-11.3 11.9c-1 1-1.2 3.3 0 4.4 1.2 1.1 3.3.8 4.4-.3l16-17c.5-.5.8-1.1.8-1.9z"></path>
                  </svg>
                </span>
                <span className="buttonas-elem">
                  <svg viewBox="0 0 46 40">
                    <path d="M46 20.038c0-.7-.3-1.5-.8-2.1l-16-17c-1.1-1-3.2-1.4-4.4-.3-1.2 1.1-1.2 3.3 0 4.4l11.3 11.9H3c-1.7 0-3 1.3-3 3s1.3 3 3 3h33.1l-11.3 11.9c-1 1-1.2 3.3 0 4.4 1.2 1.1 3.3.8 4.4-.3l16-17c.5-.5.8-1.1.8-1.9z"></path>
                  </svg>
                </span>
              </div>
            </button>
            {/* Expense list display */}
          </div>
        </div>

        <div className="last-buttons">
          <button onClick={handleSubmit}>Save Company</button>
          <button type="reset">Reset Form</button>
        </div>
      </div>
    </div>
  );
};

export default UpdateCompanyForTheFirstTimePage;
