import React, { useEffect, useState } from "react";
import DashboardItem from "./DashboardItem";
import "../css/Dashboard.css";
import { db } from "../firebase";
import { Bar } from "react-chartjs-2";

function Dashboard({ user }) {
  const [annualIncome, setAnnualIncome] = useState(0);
  const [monthlySavings, setMonthlySavings] = useState(0);
  const [savings, setSavings] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [savingsCalc, setSavingsCalc] = useState([]);
  const [incomeTest, setIncomeTest] = useState("");

  useEffect(() => {
    db.collection(`${user.email}`)
      .doc("user")
      .onSnapshot((doc) => {
        setAnnualIncome(doc.data().annualIncome);
        setMonthlySavings(
          Math.round(
            (doc.data().annualIncome * 0.7) / 12 - doc.data().livingExpenses
          )
        );
        setSavings(doc.data().savings);
        setExpenses(doc.data().livingExpenses);
        let num = [doc.data().savings];
        for (let i = 0; i < 5; i++) {
          num = [
            ...num,
            num[i] +
              Math.round(
                (doc.data().annualIncome * 0.7) / 12 - doc.data().livingExpenses
              ) *
                12,
          ];
        }
        setSavingsCalc(num);
      });
  }, []);

  return (
    <div className="dashboard">
      <div className="dashboard-container">
        <div className="dashboard-top">
          <DashboardItem
            title="Income"
            amount={annualIncome}
            edit
            user={user}
            valueUpdate="annualIncome"
          />
          <DashboardItem
            title="Current Savings"
            amount={savings}
            edit
            user={user}
            valueUpdate="savings"
          />
          <DashboardItem
            title="Living Expenses"
            amount={expenses}
            edit
            user={user}
            valueUpdate="livingExpenses"
          />
          <DashboardItem
            title="Monthly Savings"
            amount={monthlySavings}
            user={user}
          />
        </div>
        <div className="dashboard-mid">
          <div className="dashboard-graph card">
            <Bar
              options={{ maintainAspectRatio: false }}
              height={40}
              width={300}
              data={{
                labels: ["2021", "2022", "2023", "2024", "2025", "2026"],
                datasets: [
                  {
                    data: savingsCalc,
                    backgroundColor: "#C9E4C5",
                    label: "Projected Savings",
                  },
                ],
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
