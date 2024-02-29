import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SupervisorPageAPIContext } from "../context/SupervisorPageAPIContext";
import { AuthContext } from "../context/AuthContext";
import "./UpdatedCompanyForTheFirstTimePage.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const UpdateCompanyForTheFirstTimePage = () => {
  const { companyData } = useContext(SupervisorPageAPIContext);
  const { isAuthenticated } = useContext(AuthContext);

  const [establishmentDate, setEstablishmentDate] = useState("");
  const [companyLogo, setCompanyLogo] = useState(null);
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
  const [hrGender, setHrGender] = useState(false);

  const [departmentName, setDepartmentName] = useState("");
  const [departmentShiftStart, setDepartmentShiftStart] = useState("");
  const [departmentShiftEnd, setDepartmentShiftEnd] = useState("");
  const [departmentBreakStart, setDepartmentBreakStart] = useState("");
  const [departmentBreakEnd, setDepartmentBreakEnd] = useState("");

  const [holidayName, setHolidayName] = useState("");

  const [incomeDescription, setIncomeDescription] = useState("");
  const [incomeAmount, setIncomeAmount] = useState();

  const [expenseDescription, setExpenseDescription] = useState("");
  const [expenseAmount, setExpenseAmount] = useState();

  const [date, setDate] = useState(new Date());
  const [startDate, setHolidayStartDate] = useState();
  const [endDate, setHolidayEndDate] = useState();

  const [incomeRecipeDate, setIncomeRecipeDate] = useState();
  const [expenseRecipeDate, setExpenseRecipeDate] = useState();
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
        gender: hrGender ? "FEMALE" : "MALE",
      },
    ]);
    setHRInfoName("");
    setHRInfoSurname("");
    setHRInfoEmail("");
    setHRInfoPhone("");
    setHrGender(false);
  };

  const handleAddDepartment = (e) => {
    e.preventDefault();
    setCompanyDepartments((prevDepartments) => [
      ...prevDepartments,
      {
        name: departmentName,
        shiftHour: `${departmentShiftStart} - ${departmentShiftEnd}`,
        breakHour: `${departmentBreakStart} - ${departmentBreakEnd}`,
      },
    ]);
    setDepartmentName("");
    setDepartmentShiftStart("");
    setDepartmentShiftEnd("");
    setDepartmentBreakStart("");
    setDepartmentBreakEnd("");
  };

  const handleAddHoliday = (e) => {
    e.preventDefault();
    setCompanyHolidays((prevHolidays) => [
      ...prevHolidays,
      {
        name: holidayName,
        startDate: startDate,
        endDate: endDate,
      },
    ]);
    setHolidayName("");
    setHolidayStartDate("");
    setHolidayEndDate("");
  };

  const handleAddIncome = (e) => {
    e.preventDefault();
    setCompanyIncomes((prevIncomes) => [
      ...prevIncomes,
      {
        description: incomeDescription,
        amount: incomeAmount,
        incomeDate: incomeRecipeDate,
      },
    ]);
    setIncomeDescription("");
    setIncomeAmount(0);
    setIncomeRecipeDate("");
  };

  const handleAddExpense = (e) => {
    e.preventDefault();
    setCompanyExpenses((prevExpenses) => [
      ...prevExpenses,
      {
        description: expenseDescription,
        amount: expenseAmount,
        expenseDate: expenseRecipeDate,
      },
    ]);
    setExpenseDescription("");
    setExpenseAmount(0);
    setExpenseRecipeDate("");
  };

  const handleChange = (range) => {
    const [startDate, endDate] = range;
    setHolidayStartDate(startDate);
    setHolidayEndDate(endDate);
  };

  const handleSubmit = async () => {
    if (companyDepartments.length === 0) {
      alert("Please add at least one department.");
      return;
    }

    const formData = new FormData();

    const formattedDate = (date) => {
      return new Date(date).toISOString().split('T')[0];
    };

    formData.append("token", isAuthenticated.token);
    formData.append("establishmentDate", formattedDate(establishmentDate))
    formData.append("companyLogo", companyLogo)
    formData.append("address", companyAddress)

    hrInfoList.forEach((hrInfo, index) => {
      formData.append(`hrInfos[${index}].firstName`, hrInfo.firstName);
      formData.append(`hrInfos[${index}].lastName`, hrInfo.lastName);
      formData.append(`hrInfos[${index}].email`, hrInfo.email);
      formData.append(`hrInfos[${index}].phone`, hrInfo.phone);
      formData.append(`hrInfos[${index}].gender`, hrInfo.gender);
    });

    companyDepartments.forEach((department, index) => {
      formData.append(`departments[${index}].name`, department.name);
      formData.append(`departments[${index}].shiftHour`, department.shiftHour);
      formData.append(`departments[${index}].breakHour`, department.breakHour);
    });

    companyHolidays.forEach((holiday, index) => {
      formData.append(`holidays[${index}].name`, holiday.name);
      formData.append(`holidays[${index}].startDate`, formattedDate(holiday.startDate));
      formData.append(`holidays[${index}].endDate`, formattedDate(holiday.endDate));
    });

    companyIncomes.forEach((income, index) => {
      formData.append(`incomes[${index}].description`, income.description);
      formData.append(`incomes[${index}].amount`, income.amount);
      formData.append(`incomes[${index}].incomeDate`, formattedDate(income.incomeDate));
    });
    companyExpenses.forEach((expense, index) => {
      formData.append(`expenses[${index}].description`, expense.description);
      formData.append(`expenses[${index}].amount`, expense.amount);
      formData.append(`expenses[${index}].expenseDate`, formattedDate(expense.expenseDate));
    });

    try {
      const response = await axios.put("http://localhost:80/company/update-for-the-first-time", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 200) {
        window.location.reload(true);
      }
    } catch (error) {
      console.error("Error updating company for the first time:", error);
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
            <label className="company-name-header">
              {companyData.companyName}
            </label>
            <DatePicker
              className="est_date_picker"
              selected={establishmentDate}
              onChange={(date) => setEstablishmentDate(date)}
              maxDate={new Date()}
              placeholderText="Establishment Date"
              dateFormat="dd/MM/yyyy"
              wrapperClassName="custom-datepicker-wrapper"
              calendarClassName="custom-datepicker-input"
            />

            <input
              className="company-logo-input"
              type="file"
              onChange={(e) => setCompanyLogo(e.target.files[0])}
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
              <div className="hr-gender-selector">
                <label className="hr-gender-label">
                  <input
                    type="radio"
                    name="radio"
                    value="MALE"
                    checked={!hrGender}
                    onChange={() => setHrGender(false)}
                  />
                  <span>Male</span>
                </label>
                <label className="hr-gender-label">
                  <input
                    type="radio"
                    name="radio"
                    value="FEMALE"
                    checked={hrGender}
                    onChange={() => setHrGender(true)}
                  />
                  <span className="hr-gender-span">Female</span>
                </label>
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
                  placeholder="Shift Start Hour (09:00)"
                  type="text"
                  value={departmentShiftStart}
                  onChange={(event) =>
                    setDepartmentShiftStart(event.target.value)
                  }
                  required
                />
                <input
                  className="input"
                  placeholder="Shift End Hour (17:00)"
                  type="text"
                  value={departmentShiftEnd}
                  onChange={(event) =>
                    setDepartmentShiftEnd(event.target.value)
                  }
                  required
                />
              </div>
              <div className="department-breaks">
                <input
                  className="input"
                  placeholder="Break Start Hour (12:30)"
                  type="text"
                  value={departmentBreakStart}
                  onChange={(event) =>
                    setDepartmentBreakStart(event.target.value)
                  }
                  required
                />
                <input
                  className="input"
                  placeholder="Break End Hour (13:30)"
                  type="text"
                  value={departmentBreakEnd}
                  onChange={(event) =>
                    setDepartmentBreakEnd(event.target.value)
                  }
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
                <div className="date-picker-wrapper">
                  <DatePicker
                    placeholderText="Start Date"
                    selectsStart
                    selected={startDate}
                    onChange={(date) => setHolidayStartDate(date)}
                    startDate={startDate}
                  />
                </div>
                <div className="date-picker-wrapper">
                  <DatePicker
                    placeholderText="End Date"
                    selectsEnd
                    selected={endDate}
                    onChange={(date) => setHolidayEndDate(date)}
                    endDate={endDate}
                    startDate={startDate}
                    minDate={startDate}
                  />
                </div>
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
              <div className="date-picker">
                <div className="dob-input">
                  <DatePicker
                    placeholderText="Recipe Date"
                    dateFormat="dd/MM/yyyy"
                    selected={incomeRecipeDate}
                    onChange={(incomeRecipeDate) =>
                      setIncomeRecipeDate(incomeRecipeDate)
                    }
                  />
                </div>
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
                <input
                  className="input"
                  placeholder="Expense Amount"
                  type="number"
                  value={expenseAmount}
                  onChange={(event) => setExpenseAmount(event.target.value)}
                  required
                />
              </div>
              <div className="date-picker">
                <div className="ird-input">
                  <DatePicker
                    placeholderText="Recipe Date"
                    dateFormat="dd/MM/yyyy"
                    selected={expenseRecipeDate}
                    onChange={(expenseRecipeDate) =>
                      setExpenseRecipeDate(expenseRecipeDate)
                    }
                  />
                </div>
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
