import React, { useEffect, useState } from "react";
import DashboardItem from "./DashboardItem";
import "../css/Dashboard.css";
import "../css/Liabilities.css";
import { db } from "../firebase";
import { Line } from "react-chartjs-2";

function Dashboard({ user }) {
  const [homeLoan, setHomeLoan] = useState(0);
  const [homeLoanIntrest, setHomeLoanIntrest] = useState(0);
  const [creditCard, setCreditCard] = useState(0);
  const [creditCardIntrest, setCreditCardIntrest] = useState(0);
  const [homeLoanYearsArr, setHomeLoanYearsArr] = useState([]);
  const [homeLoanData, setHomeLoanData] = useState([]);
  const [creditCardYearsArr, setCreditCardYearsArr] = useState([]);
  const [creditCardData, setCreditCardData] = useState([]);
  const [creditCardMonths, setCreditCardMonths] = useState(0);
  const [homeLoanMonths, setHomeLoanMonths] = useState(0);

  useEffect(() => {
    db.collection(`${user.email}`)
      .doc("user")
      .onSnapshot((doc) => {
        setHomeLoan(doc.data().homeLoan);
        setHomeLoanIntrest(doc.data().homeLoanIntrest);
        setCreditCard(doc.data().creditCard);
        setCreditCardIntrest(doc.data().creditCardIntrest);

        // home Loan
        let homeYearsArr = [2021];
        let homeMonths = [
          paymentCalc(
            doc.data().homeLoanIntrest / 1000,
            doc.data().homeLoan,
            (doc.data().annualIncome / 12) * 0.28
          ),
        ];
        setHomeLoanMonths(Math.round(homeMonths));
        for (let i = 0; i < (homeMonths - 12) / 12; i++) {
          homeYearsArr.push(homeYearsArr[i] + 1);
        }
        setHomeLoanYearsArr(homeYearsArr);

        let homeData = [doc.data().homeLoan];
        let homeDivide = [doc.data().homeLoan / (homeYearsArr.length - 1)];
        for (let i = 0; i < homeYearsArr.length; i++) {
          if (homeData[i] - homeDivide > 5) {
            homeData = [...homeData, homeData[i] - homeDivide];
          } else {
            homeData = [...homeData, 0];
          }
        }
        setHomeLoanData(homeData);

        // credit card
        let creditYearsArr = [2021];
        let creditMonths = [
          paymentCalc(
            doc.data().creditCardIntrest / 1000,
            doc.data().creditCard,
            (doc.data().annualIncome / 12) * 0.1
          ),
        ];
        setCreditCardMonths(Math.round(creditMonths));
        for (let i = 0; i < (creditMonths - 12) / 12; i++) {
          creditYearsArr.push(creditYearsArr[i] + 1);
        }
        setCreditCardYearsArr(creditYearsArr);
        let creditData = [doc.data().creditCard];
        let creditDivide = [
          doc.data().creditCard / (creditYearsArr.length - 1),
        ];
        for (let i = 0; i < creditYearsArr.length; i++) {
          if (creditData[i] - creditDivide > 5) {
            creditData = [...creditData, creditData[i] - creditDivide];
          } else {
            creditData = [...creditData, 0];
          }
        }
        setCreditCardData(creditData);
      });
  }, []);

  const paymentCalc = (i, PV, PMT) => {
    let N = -(Math.log(1 - (PV * i) / PMT) / Math.log(1 + i));
    return N;
  };

  return (
    <div className="liabilities">
      <div className="liabilities-container">
        <div className="liabilities-column">
          <div className="liabilities-top">
            <DashboardItem
              title="Home Loan"
              amount={homeLoan}
              liability
              intrest={homeLoanIntrest}
              edit
              user={user}
              valueUpdate="homeLoan"
              intrestUpdate="homeLoanIntrest"
            />
            <DashboardItem
              title="Paid Off In"
              amount={homeLoanMonths}
              month
              user={user}
            />
          </div>
          <div className="liabilities-mid">
            <div className="liabilities-graph card">
              <Line
                options={{ maintainAspectRatio: false }}
                height={40}
                width={300}
                data={{
                  labels: homeLoanYearsArr,
                  datasets: [
                    {
                      data: homeLoanData,
                      backgroundColor: "#F6D6AD",
                      borderColor: "#F6D6AD",
                      label: "Home Loan",
                    },
                  ],
                }}
              />
            </div>
          </div>
        </div>
        <div className="liabilities-column">
          <div className="liabilities-top">
            <DashboardItem
              title="Credit Card"
              amount={creditCard}
              liability
              intrest={creditCardIntrest}
              edit
              user={user}
              valueUpdate="creditCard"
              intrestUpdate="creditCardIntrest"
            />
            <DashboardItem
              title="Paid Off In"
              amount={creditCardMonths}
              month
              user={user}
            />
          </div>
          <div className="liabilities-mid">
            <div className="liabilities-graph card">
              <Line
                options={{ maintainAspectRatio: false }}
                height={40}
                width={300}
                data={{
                  labels: creditCardYearsArr,
                  datasets: [
                    {
                      data: creditCardData,
                      backgroundColor: "#A7C5EB",
                      borderColor: "#A7C5EB",
                      label: "Credit Card",
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
