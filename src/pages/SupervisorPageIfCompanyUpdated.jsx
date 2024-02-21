import { useState, useEffect, useContext } from "react";
import EmployeeList from "../components/EmployeeList";
import HolidayList from "../components/HolidayList";
import { SupervisorPageAPIContext } from "../context/SupervisorPageAPIContext";
import AddEmployeeForm from "../components/AddEmployee";
import axios from "axios";

const SupervisorPageIfCompanyUpdated = () => {
  const { companyData } = useContext(SupervisorPageAPIContext);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [profitOrLoss, setProfitOrLoss] = useState(0);
  const [employees, setEmployees] = useState([]);
  const [isAddingEmployee, setIsAddingEmployee] = useState(false); // Yeni satır

  useEffect(() => {
    calculateProfitLoss();
  }, [companyData]);

  const calculateProfitLoss = () => {
    let calculatedIncome = 0;
    companyData.incomes.forEach((income) => {
      calculatedIncome += income.amount;
    });
    setTotalIncome(calculatedIncome);

    let calculatedExpense = 0;
    companyData.expenses.forEach((expense) => {
      calculatedExpense += expense.amount;
    });
    setTotalExpense(calculatedExpense);

    const calculatedProfitLoss = calculatedIncome - calculatedExpense;
    setProfitOrLoss(calculatedProfitLoss);
  };

  const handleAddEmployee = async (newEmployee) => {
    try {
      const response = await axios.post(
        "http://localhost:9091/api/v1/personnel/create",
        newEmployee
      );

      const data = response.data;
      console.log("Yeni çalışan eklendi:", data);
      setEmployees([...employees, data]);
      setIsAddingEmployee(false);
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };



  
  return (
    <div className="yonetici-container">
      <h2>Yönetici Sayfası</h2>
      <div className="calisan-listesi">
        <h3>Personnels</h3>
        <EmployeeList />
      </div>

      {isAddingEmployee && (
        <div
          className="modal-background"
          onClick={() => setIsAddingEmployee(false)}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Çalışan Ekle</h3>
            <AddEmployeeForm onAddEmployee={handleAddEmployee} />
          </div>
        </div>
      )}

      {/* Çalışan Ekle butonu buraya taşındı */}
      {!isAddingEmployee && (
        <button
          type="button"
          className="button-add-employee"
          onClick={() => setIsAddingEmployee(true)}
        >
          <span className="button-text-add-employee">Add Employee</span>
          <span className="button-icon-add-employee">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              viewBox="0 0 24 24"
              strokeWidth="2"
              strokeLinejoin="round"
              strokeLinecap="round"
              stroke="currentColor"
              height="24"
              fill="none"
              className="svg"
            >
              <line y2="19" y1="5" x2="12" x1="12"></line>
              <line y2="12" y1="12" x2="19" x1="5"></line>
            </svg>
          </span>
        </button>
      )}

      <div className="finansal-bilgiler">
        <h3>Finansal Bilgiler</h3>
        <div className="finansal-kutular">
          <div className="finansal-kutu">
            <p>
              <strong>Kar/Zarar Bilgileri:</strong> {profitOrLoss}
            </p>
          </div>
          <div className="finansal-kutu">
            <p>
              <strong>Toplam Gelir Bilgisi:</strong> {totalIncome}
            </p>
          </div>
          <div className="finansal-kutu">
            <p>
              <strong>Toplam Gider Bilgisi:</strong> {totalExpense}
            </p>
          </div>
          <div className="finansal-kutu">
            <p>
              <strong>Yaklaşan Ödeme Bilgileri:</strong> {totalExpense}
            </p>
          </div>
          <div className="finansal-kutu">
            <p>
              <strong>Resmi Tatil Bilgileri:</strong>{" "}
              {<HolidayList holidays={companyData.holidays} />}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupervisorPageIfCompanyUpdated;
