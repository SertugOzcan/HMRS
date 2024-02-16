import { useEffect, useState, useContext } from "react";
import EmployeeList from "../components/EmployeeList";
import HolidayList from '../components/HolidayList'
import { SupervisorPageAPIContext } from "../context/SupervisorPageAPIContext";

const SupervisorPageIfCompanyUpdated = () => {

  const {companyData} = useContext(SupervisorPageAPIContext);
  console.log("companyData.holidays:", companyData.holidays);

  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [profitOrLoss, setProfitOrLoss] = useState(0);

  function calculateProfitLoss() {
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
  }
  useEffect(()=>{
    calculateProfitLoss();
  },[companyData]);

  return (
    <div className="yonetici-container">
      <h2>Yönetici Sayfası</h2>
      <div className="calisan-listesi">
        <h3>Personnels</h3>
        {/* <EmployeeList personnelData={companyData.personnelList} /> */}
      </div>

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
              <strong>Resmi Tatil Bilgileri:</strong> {<HolidayList holidays={companyData.holidays}/>}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupervisorPageIfCompanyUpdated;
