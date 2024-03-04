import { useState, useEffect, useContext } from "react";
import "./SupervisorPageCompanyData.css";
import HolidayList from "../HolidayList";
import { SupervisorPageAPIContext } from "../../context/SupervisorPageAPIContext";
import { PieChart } from "@mui/x-charts/PieChart";

const SupervisorPageCompanyData = () => {
  const { companyData } = useContext(SupervisorPageAPIContext);
  const [totalCurrentMonthIncome, setTotalCurrentMonthIncome] = useState(0);
  const [totalNextMonthIncome, setTotalNextMonthIncome] = useState(0);
  const [totalCurrentMonthExpense, setTotalCurrentMonthExpense] = useState(0);
  const [totalNextMonthExpense, setTotalNextMonthExpense] = useState(0);
  const [totalProfitOrLossCurrentMonth, setProfitOrLossCurrentMonth] =
    useState(0);
  const [totalProfitOrLossNextMonth, setProfitOrLossNextMonth] = useState(0);

  console.log(companyData.incomes);
  console.log(companyData.expenses);
  console.log(companyData.holidays);

  useEffect(() => {
    calculateProfitLoss();
  }, [companyData]);

  const date = new Date();
  const currentDate = date.getMonth() + 1;
  console.log(currentDate);

  const calculateProfitLoss = () => {
    const currentMonthIncomes = companyData.incomes.filter(
      (income) => new Date(income.incomeDate).getMonth() === currentDate
    );

    const nextMonthIncomes = companyData.incomes.filter(
      (income) => income.incomeDate === currentDate + 1
    );

    const totalCurrentMonthIncome = currentMonthIncomes.reduce(
      (sum, income) => sum + income.amount,
      0
    );
    const totalNextMonthIncome = nextMonthIncomes.reduce(
      (sum, income) => sum + income.amount,
      0
    );

    console.log("totalCurrentMonthIncome", totalCurrentMonthIncome);
    console.log("totalNextMonthIncome", totalNextMonthIncome);

    setTotalCurrentMonthIncome(totalCurrentMonthIncome);
    setTotalNextMonthIncome(totalNextMonthIncome);

    const currentMonthExpenses = companyData.expenses.filter(
      (expense) => expense.expenseDate === currentDate
    );

    const nextMonthExpenses = companyData.expenses.filter(
      (expense) => expense.expenseDate === currentDate
    );

    const totalCurrentMonthExpense = currentMonthExpenses.reduce(
      (sum, expense) => sum + expense.amount,
      0
    );
    const totalNextMonthExpense = nextMonthExpenses.reduce(
      (sum, expense) => sum + expense.amount,
      0
    );

    console.log("totalCurrentMonthExpense", totalCurrentMonthExpense);
    console.log("totalNextMonthExpense", totalNextMonthExpense);

    setTotalCurrentMonthExpense(totalCurrentMonthExpense);
    setTotalNextMonthExpense(totalNextMonthExpense);

    const profitLossCurrentMonth =
      totalCurrentMonthIncome - totalCurrentMonthExpense;
    const profitLossNextMonth = totalNextMonthIncome - totalNextMonthExpense;

    setProfitOrLossCurrentMonth(profitLossCurrentMonth);
    setProfitOrLossNextMonth(profitLossNextMonth);
  };

  const calculateHolidayDuration = (holiday) => {
    const startDate = new Date(holiday.startDate);
    const endDate = new Date(holiday.endDate);
  
    const oneDay = 24 * 60 * 60 * 1000;
  
    const durationInDays = Math.round((endDate - startDate) / oneDay) + 1;
  
    return durationInDays;
  };

  return (
    <div className="company-data-major-container">
      <div className="finansal-bilgiler">
        <h3>Finansal Bilgiler</h3>
        <div className="finansal-kutular">
          <div className="finansal-kutu">
            <p>
              <strong>Kar/Zarar Bilgileri:</strong>{" "}
              {totalProfitOrLossCurrentMonth}
            </p>
            <PieChart
              colors={["cyan", "red"]}
              series={[
                {
                  data: [
                    { id: 0, value: totalCurrentMonthIncome, label: "Income" },
                    {
                      id: 1,
                      value: totalCurrentMonthExpense,
                      label: "Expense",
                    },
                  ],
                },
              ]}
              width={600}
              height={300}
            />
          </div>
          <div className="finansal-kutu">
            <p>
              <strong>{currentDate}. Ay Toplam Gelir Bilgisi:</strong>{" "}
              {totalCurrentMonthIncome}
            </p>
          </div>
          <div className="finansal-kutu">
            <p>
              <strong>{currentDate}. Ay Toplam Gider Bilgisi:</strong>{" "}
              {totalCurrentMonthExpense}
            </p>
          </div>
          <div className="finansal-kutu">
            <p>
              <strong>Yaklaşan Ödeme Bilgileri:</strong> {totalNextMonthExpense}
            </p>
          </div>
          <div className="finansal-kutu">
            <table className="holiday-table">
              <thead>
                <tr>
                  <th>Tatil Adı</th>
                  <th>Tatil Baslangic</th>
                  <th>Tatil Bitis</th>
                  <th>Tarih Suresi</th>
                </tr>
              </thead>
              <tbody>
                {companyData.holidays.map((holiday, index) => (
                  <tr key={index}>
                    <td>{holiday.name}</td>
                    <td>{holiday.startDate}</td>
                    <td>{holiday.endDate}</td>
                    <td>{calculateHolidayDuration(holiday)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupervisorPageCompanyData;
