import React, { useEffect, useState } from "react";
import DashboardItem from "./DashboardItem";
import "../css/Dashboard.css";
import { db } from "../firebase";
import { Bar, Doughnut } from "react-chartjs-2";

function Dashboard({ user }) {
  const [networth, setNetworth] = useState(0);
  const [savings, setSavings] = useState(0);
  const [assets, setAssets] = useState(0);
  const [liabilities, setLiabilities] = useState(0);
  const [netWorthCalc, setNetWorthCalc] = useState([]);
  const [netWorthYearsArr, setNetWorthYearsArr] = useState([]);
  const [netWorthGoal, setNetWorthGoal] = useState(0);
  const [netWorthGoalYear, setNetWorthGoalYear] = useState(0);

  useEffect(() => {
    db.collection(`${user.email}`)
      .doc("user")
      .onSnapshot((doc) => {
        setNetWorthGoal(doc.data().goalNetWorth);
        setSavings(doc.data().savings);
        setAssets(doc.data().assetValue1 + doc.data().assetValue2);
        setLiabilities(doc.data().homeLoan + doc.data().creditCard);
        setNetworth(
          doc.data().savings +
            doc.data().assetValue1 +
            doc.data().assetValue2 -
            doc.data().homeLoan -
            doc.data().creditCard
        );
        let num = [
          doc.data().savings +
            doc.data().assetValue1 +
            doc.data().assetValue2 -
            doc.data().homeLoan -
            doc.data().creditCard,
        ];
        let ass = [doc.data().assetValue1 + doc.data().assetValue2];
        let lia = [doc.data().homeLoan + doc.data().creditCard];
        for (let i = 0; i < doc.data().goalNetWorth; i++) {
          if (num[i] < doc.data().goalNetWorth) {
            ass = [...ass, ass[i] * 1.05];
            lia = [...lia, lia[i] - (doc.data().annualIncome / 12) * 0.3];
            num = [
              ...num,
              num[0] + (ass[i + 1] - ass[0]) - (lia[i + 1] - lia[0]),
            ];
          } else {
            i = doc.data().goalNetWorth;
          }
        }
        let netWorthYears = [2021];

        for (let i = 0; i < num.length - 1; i++) {
          netWorthYears.push(netWorthYears[i] + 1);
        }
        setNetWorthCalc(num);
        setNetWorthYearsArr(netWorthYears);
        setNetWorthGoalYear(netWorthYears[netWorthYears.length - 1]);
      });
  }, [user.email]);

  return (
    <div className="dashboard">
      <div className="dashboard-main-container">
        <div className="dashboard-main">
          <div className="dashboard-main-container">
            <div className="dashboard-main-top">
              <DashboardItem title="Networth" amount={networth} user={user} />
              <DashboardItem title="Savings" amount={savings} user={user} />
              <DashboardItem title="Assets" amount={assets} user={user} />
            </div>
            <div className="dashboard-main-graph">
              <Bar
                options={{ maintainAspectRatio: false }}
                height={500}
                width={300}
                data={{
                  labels: netWorthYearsArr,
                  datasets: [
                    {
                      data: netWorthCalc,
                      backgroundColor: "rgb(75, 192, 192)",
                      label: "Projected Networth",
                    },
                  ],
                }}
              />
            </div>
          </div>
        </div>
        <div className="dashboard-side">
          <div className="dashboard-side-container">
            <div className="net-worth-goal">
              <p>
                Networth Goal: <br />
                <span>{`$${netWorthGoal}`}</span>
              </p>
              <p>
                You will reach your goal in <br />
                <span>{netWorthGoalYear}</span>
              </p>
            </div>
            <div className="dashboard-side-graph">
              <Doughnut
                options={{ maintainAspectRatio: false }}
                height={400}
                width={300}
                data={{
                  labels: ["Savings", "Assets", "Liabilities"],
                  datasets: [
                    {
                      data: [savings, assets, liabilities],
                      backgroundColor: ["#ffcd56", "#36a2eb", "#ff6384"],
                      label: "Networth",
                    },
                  ],
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
