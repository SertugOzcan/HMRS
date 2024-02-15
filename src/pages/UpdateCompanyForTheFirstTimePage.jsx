import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const UpdateCompanyForTheFirstTimePage = (companyName) => {
  const [establishmentDate, setEstablishmentDate] = useState("");
  const [companyLogo, setCompanyLogo] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [hrInfoList, setHrInfoList] = useState([]);
  const [companyDepartments,setCompanyDepartments] = useState([]);
  const [companyHolidays,setCompanyHolidays] = useState([]);
  const [companyIncomes , setCompanyIncomes] = useState([]);
  const [companyExpenses, setCompanyExpenses] = useState([]);
  const [hrInfoName, setHRInfoName] = useState("");
  const [hrInfoSurname, setHRInfoSurname] = useState("");
  const [hrInfoEmail, setHRInfoEmail] = useState("");
  const [hrInfoPhone, setHRInfoPhone] = useState("");
  const [departmentName,setDepartmentName] = useState('');
  const [departmentShifts,setDepartmentShifts] = useState('');
  const [departmentBreaks,setDepartmentBreaks] = useState('');
  const [holidayName,setHolidayName] = useState('');
  const [holidayDuration,setHolidayDuration] = useState(0);
  const handleAddHRInfo = () => {
    setHrInfoList((prevhrinfolist) => [
      ...prevhrinfolist,
      {
        firstName: hrInfoName,
        lastName: hrInfoSurname,
        email: hrInfoEmail,
        phone: hrInfoPhone,
      },
    ]);
    setHRInfoName('');
    setHRInfoSurname('');
    setHRInfoEmail('');
    setHRInfoPhone('');
  };
  const handleAddDepartment = () => {
    setCompanyDepartments((prevDepartments)=>[
        ...prevDepartments, {
            name: departmentName,
            shifts: departmentShifts,
            breaks: departmentBreaks
        }
    ]);
    setDepartmentName('');
    setDepartmentShifts('');
    setDepartmentBreaks('');
  }
  const handleAddHoliday = () => {
    setCompanyHolidays((prevHolidays)=>[
        ...prevHolidays,{
            name: holidayName,
            duration: holidayDuration
        }
    ]);
    setHolidayName('');
    setHolidayDuration('');
  }
  const handleAddIncome = () => {
    setCompanyIncomes((prevIncomes)=> [
        ...prevIncomes,{
            description: incomeDescription,
            amount: incomeAmount
        }
    ]);
    setIncomeDescription('');
    setIncomeAmount(0);
  }
  const handleAddExpense = () => {
    setCompanyExpenses((prevExpenses)=> [
        ...prevExpenses,{
            description: expenseDescription,
            amount: expenseAmount
        }
    ]);
    setExpenseDescrition('');
    setExpenseAmount(0);
  }
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const payload = {}; //buraya company update icin payload gelecek
    const response = await axios.post('http://localhost:9095/api/v1/company/update-for-first-time',payload)
    // if(response.status===200){
    //     navigate("/yonetici-page")
    // }   bunun gibi bir kontrol ile istek await edildikten ve basarili olduktan sonra yonetici-sayfasina yonlendirilebilir.
  };

//   hic css yapmadim, gece calismak isteyen ugrasabilir isterse :)

  return (
    <form className="update-company-form" onSubmit={handleSubmit}>
      <label>{companyName}</label>
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
        required
      />
      <div className="hr-info-list-container">
        <div className="hr-info-container">
          <div className="hr-info-name">
            <label>Name</label>
            <input
              type="text"
              value={hrInfoName}
              onChange={(event) => setHRInfoName(event.target.value)}
              required
            />
          </div>
          <div className="hr-info-surname">
            <label>Surname</label>
            <input
              type="text"
              value={hrInfoSurname}
              onChange={(event) => setHRInfoSurname(event.target.value)}
              required
            />
          </div>
          <div className="hr-info-email">
            <label>Name</label>
            <input
              type="text"
              value={hrInfoEmail}
              onChange={(event) => setHRInfoEmail(event.target.value)}
              required
            />
          </div>
          <div className="hr-info-phone">
            <label>Name</label>
            <input
              type="text"
              value={hrInfoPhone}
              onChange={(event) => setHRInfoPhone(event.target.value)}
              required
            />
          </div>
        </div>
        <button onClick={handleAddHRInfo}>Add HRInfo</button>
        <textarea name="hr-info-list" id="hr-info-list" cols="30" rows="10">
          {...hrInfoList}
        </textarea>
      </div>

      <div className="company-department-list-container">
        <div className="company-department-container">
          <div className="department-name">
            <label>Department Name:</label>
            <input
              type="text"
              value={departmentName}
              onChange={(event) => setDepartmentName(event.target.value)}
              required
            />
          </div>
          <div className="department-shifts">
            <label>Shifts:</label>
            <input
              type="text"
              value={departmentShifts}
              onChange={(event) => setDepartmentShifts(event.target.value)}
              required
            />
          </div>
          <div className="department-breaks">
            <label>Breaks:</label>
            <input
              type="text"
              value={departmentBreaks}
              onChange={(event) => setDepartmentBreaks(event.target.value)}
              required
            />
          </div>
        </div>
        <button onClick={handleAddDepartment}>Add Department</button>
        <textarea name="department-list" id="department-list" cols="30" rows="10">{...companyDepartments}</textarea>
      </div>

      <div className="company-holiday-list-container">
        <div className="company-holiday-container">
            <div className="holiday-name">
                <label>Holiday Name:</label>
                <input type="text" value={holidayName} onChange={(event)=>setHolidayName(event.target.value)} required/>
            </div>
            <div className="holiday-duration">
                <label>Holiday Duration:</label>
                <input type="number" value={holidayDuration} onChange={(event)=>setHolidayDuration(event.target.value)} required/>
            </div>
        </div>
        <button onClick={handleAddHoliday}>Add Holiday</button>
        <textarea name="company-holidays" id="company-holidays" cols="30" rows="10">{...companyHolidays}</textarea>
      </div>

      <div className="company-income-list-container">
        <div className="company-income-container">
            <div className="income-description">
                <label>Income Description:</label>
                <input type="text" value={incomeDescription} onChange={(event)=>setIncomeDescription(event.target.value)} required/>
            </div>
            <div className="holiday-duration">
                <label>Holiday Duration:</label>
                <input type="number" value={incomeAmount} onChange={(event)=>setIncomeAmount(event.target.value)} required/>
            </div>
        </div>
        <button onClick={handleAddIncome}>Add Income</button>
        <textarea name="company-incomes" id="company-incomes" cols="30" rows="10">{...companyIncomes}</textarea>
      </div>

      <div className="company-expense-list-container">
        <div className="company-expense-container">
            <div className="expense-description">
                <label>Expense Description:</label>
                <input type="text" value={expenseDescription} onChange={(event)=>setExpenseDescrition(event.target.value)} required/>
            </div>
            <div className="expense-amount">
                <label>Expense Amount:</label>
                <input type="number" value={expenseAmount} onChange={(event)=>setExpenseAmount(event.target.value)} required/>
            </div>
        </div>
        <button onClick={handleAddExpense}>Add Expense</button>
        <textarea name="company-expenses" id="company-expenses" cols="30" rows="10">{...companyExpenses}</textarea>
      </div>
      <button type="submit">Save Company</button>
    </form>
  );
};

export default UpdateCompanyForTheFirstTimePage;
