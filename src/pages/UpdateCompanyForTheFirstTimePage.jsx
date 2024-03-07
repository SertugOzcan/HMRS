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

  const [isLoading, setIsLoading] = useState(false);


  const [currentPage, setCurrentPage] = useState("coreInfo");
  const handlePageChange = (pageName) => {
    setCurrentPage(pageName);
    document.getElementById(pageName).scrollIntoView({ behavior: "smooth" });
  };

  const handleAddHRInfo = (e) => {
    e.preventDefault();
    if(!hrInfoName.trim() || !hrInfoSurname.trim() || !hrInfoEmail.trim() || !hrInfoPhone.trim()){
      alert("Please fill in all fields for the hr info!");
      return;
    }
    if(!hrInfoEmail.includes("@")){
      alert("Invalid email address for HR Info")
      return;
    }
    if (hrInfoPhone.length !== 11) {
      alert("Phone number must be 11 character");
      return
    }
    if (!/^\d+$/.test(hrInfoPhone)) {
      alert("Invalid characters in hr info's phone number!");
      return
    }
    if (!hrInfoPhone.startsWith("0")) {
      alert("Phone number must start with number zero!");
      return
    }

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
    const regexTimeFormat = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;

    const trimmedShiftStart = departmentShiftStart.trim();
    const trimmedShiftEnd = departmentShiftEnd.trim();
    const trimmedBreakStart = departmentBreakStart.trim();
    const trimmedBreakEnd = departmentBreakEnd.trim();
    if (
      !trimmedShiftStart ||
      !trimmedShiftEnd ||
      !trimmedBreakStart ||
      !trimmedBreakEnd
    ) {
      alert("Please fill in all fields for the department!");
      return;
    }
    if (
      !regexTimeFormat.test(trimmedShiftStart) ||
      !regexTimeFormat.test(trimmedShiftEnd) ||
      !regexTimeFormat.test(trimmedBreakStart) ||
      !regexTimeFormat.test(trimmedBreakEnd)
    ) {
      alert("Please enter valid time formats (HH:mm) for all fields!");
      return;
    }
    setCompanyDepartments((prevDepartments) => [
      ...prevDepartments,
      {
        name: departmentName,
        shiftHour: `${trimmedShiftStart} - ${trimmedShiftEnd}`,
        breakHour: `${trimmedBreakStart} - ${trimmedBreakEnd}`,
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
    if(!incomeDescription.trim()){
      alert("Please add description for your income!")
      return;
    }
    if(!incomeAmount) {
      alert("Please add amount for your income!");
      return;
    }
    if(!/^\d+$/.test(incomeAmount)) {
      alert("Income amount can only be digits!");
      return;
    }
    if(!incomeRecipeDate){
      alert("Please add recipe date for your income!");
      return;
    }
    setCompanyIncomes((prevIncomes) => [
      ...prevIncomes,
      {
        description: incomeDescription.trim(),
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
    if(!expenseDescription.trim()){
      alert("Please add description for your expense!")
      return;
    }
    if(!expenseAmount) {
      alert("Please add amount for your expense!");
      return;
    }
    if(!/^\d+$/.test(expenseAmount)) {
      alert("Expense amount can only be digits!");
      return;
    }
    if(!expenseRecipeDate){
      alert("Please add recipe date for your expense!");
      return;
    }
    setCompanyExpenses((prevExpenses) => [
      ...prevExpenses,
      {
        description: expenseDescription.trim(),
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
    setIsLoading(true); 
  
    if (companyDepartments.length === 0) {
      alert("Please add at least one department.");
      setIsLoading(false); 
      return;
    }

    if (companyIncomes.length === 0 && companyExpenses.length === 0) {
      alert("Please add at least one income or expense data for a better experience on our site");
      setIsLoading(false);
      return;
    }

    if(hrInfoList.length === 0) {
      alert("Please add at least one HR Info for a better experience on our site");
      setIsLoading(false);
      return;
    }

    if(establishmentDate === "") {
      alert("Please add establishment date of your company");
      setIsLoading(false);
      return;
    }

    if (!companyLogo) {
      alert("Please upload a company logo");
      setIsLoading(false);
      return;
    }

    const beforePayload = {
      token: isAuthenticated.token,
      establishmentDate: establishmentDate,
      address: companyAddress,
      hrInfos: hrInfoList,
      departments: companyDepartments,
      holidays: companyHolidays,
      incomes: companyIncomes,
      expenses: companyExpenses
    };

    const file = companyLogo;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "epd6rg4j");
    let cloudinaryUrl;
    try {
      const response = await axios.post("https://api.cloudinary.com/v1_1/dhwpj4ze4/upload", formData);
      cloudinaryUrl = response.data.url;
      setIsLoading(false);
    } catch (error) {
      console.error("Error while uploading image for updating company for the first time:", error);
      setIsLoading(false);
    }

    const completePayload = {...beforePayload, companyLogoUrl: cloudinaryUrl}

    try {
      const response = await axios.put("http://34.75.226.10:80/company/update-for-the-first-time",completePayload);
      if(response.status === 200) {
        window.location.reload(true);
      }
    } catch (error) {
      console.error("Error updating company for the first time:", error);
    }
  }

  return (
    <div className="update-company-page">
    {isLoading && (
      <div className="loader">
      <div className="box box0">
        <div></div>
      </div>
      <div className="box box1">
        <div></div>
      </div>
      <div className="box box2">
        <div></div>
      </div>
      <div className="box box3">
        <div></div>
      </div>
      <div className="box box4">
        <div></div>
      </div>
      <div className="box box5">
        <div></div>
      </div>
      <div className="box box6">
        <div></div>
      </div>
      <div className="box box7">
        <div></div>
      </div>
      <div className="ground">
        <div></div>
      </div>
    </div>
    )}
      <div className="sidebar">
        <button onClick={() => handlePageChange("coreInfo")}>Company Info</button>
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
          <h2>Company Info</h2>

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
