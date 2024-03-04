import { useState, useEffect, useContext } from "react";
import "./SupervisorPageCompanyData.css";
import HolidayList from "../HolidayList";
import { SupervisorPageAPIContext } from "../../context/SupervisorPageAPIContext";
import { PieChart } from "@mui/x-charts/PieChart";
import randomColor from "randomcolor";

const SupervisorPageCompanyData = () => {
  const { companyData } = useContext(SupervisorPageAPIContext);
  const [totalCurrentMonthIncome, setTotalCurrentMonthIncome] = useState(0);
  const [totalNextMonthIncome, setTotalNextMonthIncome] = useState(0);
  const [totalCurrentMonthExpense, setTotalCurrentMonthExpense] = useState(0);
  const [totalNextMonthExpense, setTotalNextMonthExpense] = useState(0);
  const [totalProfitOrLossCurrentMonth, setProfitOrLossCurrentMonth] =
    useState(0);
  const [totalProfitOrLossNextMonth, setProfitOrLossNextMonth] = useState(0);

  useEffect(() => {
    calculateProfitLoss();
  }, [companyData]);

  const date = new Date();
  const currentDate = date.getMonth() + 1;

  const calculateProfitLoss = () => {
    const currentMonthIncomes = companyData.incomes.filter(
      (income) => (Number(income.incomeDate.split('-')[1].split('')[1])) === currentDate
    );

    const nextMonthIncomes = companyData.incomes.filter(
      (income) => (Number(income.incomeDate.split('-')[1].split('')[1])+1) === currentDate + 1
    );

    const totalCurrentMonthIncome = currentMonthIncomes.reduce(
      (sum, income) => sum + income.amount,
      0
    );
    const totalNextMonthIncome = nextMonthIncomes.reduce(
      (sum, income) => sum + income.amount,
      0
    );

    setTotalCurrentMonthIncome(totalCurrentMonthIncome);
    setTotalNextMonthIncome(totalNextMonthIncome);

    const currentMonthExpenses = companyData.expenses.filter(
      (expense) => (Number(expense.expenseDate.split('-')[1].split('')[1])) === currentDate
    );

    const nextMonthExpenses = companyData.expenses.filter(
      (expense) => (Number(expense.expenseDate.split('-')[1].split('')[1])) === currentDate + 1
    );

    const totalCurrentMonthExpense = currentMonthExpenses.reduce(
      (sum, expense) => sum + expense.amount,
      0
    );
    const totalNextMonthExpense = nextMonthExpenses.reduce(
      (sum, expense) => sum + expense.amount,
      0
    );

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

  const combinedExpenses = {};
  const combinedIncomes = {};

  companyData.expenses
  .filter((expense) => {
    const expenseMonth = Number(expense.expenseDate.split('-')[1].split('')[1]);
    return expenseMonth === currentDate;
  })
  .forEach((expense) => {
    if (combinedExpenses[expense.description]) {
      combinedExpenses[expense.description].value += expense.amount;
    } else {
      combinedExpenses[expense.description] = {
        id: expense.id,
        value: expense.amount,
        label: expense.description,
      };
    }
  });

  companyData.incomes
  .filter((income) => {
    const incomeMonth = Number(income.incomeDate.split('-')[1].split('')[1]);
    return incomeMonth === currentDate;
  })
  .forEach((income) => {
    if (combinedIncomes[income.description]) {
      combinedIncomes[income.description].value += income.amount;
    } else {
      combinedIncomes[income.description] = {
        id: income.id,
        value: income.amount,
        label: income.description,
      };
    }
  });

  const pieChartDataExpenses = Object.values(combinedExpenses);
  const pieChartDataIncomes = Object.values(combinedIncomes);

  const generateRandomColors = (count) => {
    const colors = [];
    for (let i = 0; i < count; i++) {
      colors.push(randomColor());
    }
    return colors;
  };

 
  const generateRandomColor = () => randomColor();

  return (
    <div className="company-data-major-container">
      <div className="finansal-bilgiler">
        <h2>Welcome to the Company Data Page!</h2>
        <br />
        <p>Explore essential details about the company's incomes, expenses, and personnel information. This page provides a comprehensive view of monthly financial insights, including approved spending and advance requests. You can also access information about company holidays, the number of departments, and the total personnel count.</p>
        <h4><em>Personnel salaries, accepted advance requests, and spending details are presented under the expenses section on this page.</em></h4>
        <div className="finansal-kutular">
          <div className="finansal-charts">
            
              <div className="finansal-chart">
                <p>
                  <strong>Current Month Income/Expense Amount:</strong>{" "}
                  {totalProfitOrLossCurrentMonth}
                </p>
                <PieChart
                  colors={["cyan", "red"]}
                  series={[
                    {
                      data: [
                        { id: 0, value: totalCurrentMonthIncome, label: "Incomes" },
                        {
                          id: 1,
                          value: totalCurrentMonthExpense,
                          label: "Expenses",
                        },
                      ],
                    },
                  ]}
                  width={400}
                  height={200}
                />
              </div>
              <div className="finansal-chart">
                <p>
                  <strong>Incomes in Detail:</strong>
                </p>
                <PieChart
                  colors={generateRandomColors(pieChartDataIncomes.length)}
                  series={[
                    {
                      data: pieChartDataIncomes,
                    },
                  ]}
                  width={400}
                  height={200}
                />
              </div>
              <div className="finansal-chart">
                <p>
                  <strong>Expenses in Detail:</strong>
                </p>
                <PieChart
                  colors={generateRandomColors(pieChartDataExpenses.length)}
                  series={[
                    {
                      data: pieChartDataExpenses,
                    },
                  ]}
                  width={400}
                  height={200}
                />
              </div>
            
          </div>
          <div className="finansal-kutu">
            <p>
              <strong>Current Month Total Income Amount:</strong>{" "}
              {totalCurrentMonthIncome} TL
            </p>
          </div>
          <div className="finansal-kutu">
            <p>
              <strong>Current Month Total Expense Amount:</strong>{" "}
              {totalCurrentMonthExpense} TL
            </p>
          </div>
          <div className="finansal-kutu">
            <p>
              <strong>Next Month Estimated Expense Amount:</strong> {totalNextMonthExpense} TL
            </p>
          </div>
          <div className="finansal-kutu">
            <table className="holiday-table">
              <thead>
                <tr>
                  <th>Holiday Name</th>
                  <th>Holiday Starts</th>
                  <th>Holiday Ends</th>
                  <th>Holiday Duration</th>
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
