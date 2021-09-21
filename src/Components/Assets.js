import React, { useEffect, useState } from "react";
import DashboardItem from "./DashboardItem";
import "../css/Dashboard.css";
import { db } from "../firebase";
import { Line } from "react-chartjs-2";

function Dashboard({ user }) {
  const [assetName1, setAssetName1] = useState(0);
  const [assetValue1, setAssetValue1] = useState(0);
  const [assetName2, setAssetName2] = useState(0);
  const [assetValue2, setAssetValue2] = useState(0);
  const [assetCalc, setAssetCalc] = useState([]);

  useEffect(() => {
    db.collection(`${user.email}`)
      .doc("user")
      .onSnapshot((doc) => {
        setAssetName1(doc.data().assetName1);
        setAssetName2(doc.data().assetName2);
        setAssetValue1(doc.data().assetValue1);
        setAssetValue2(doc.data().assetValue2);
        let num = [doc.data().assetValue1 + doc.data().assetValue2];
        for (let i = 0; i < 5; i++) {
          num = [...num, num[i] * 1.07];
        }
        setAssetCalc(num);
      });
  }, []);

  return (
    <div className="dashboard">
      <div className="dashboard-container">
        <div className="dashboard-top">
          <DashboardItem
            title={assetName1}
            amount={assetValue1}
            edit
            user={user}
            valueUpdate="assetValue1"
          />
          <DashboardItem
            title={assetName2}
            amount={assetValue2}
            edit
            user={user}
            valueUpdate="assetValue2"
          />
        </div>
        <div className="dashboard-mid">
          <div className="dashboard-graph card">
            <Line
              options={{ maintainAspectRatio: false }}
              height={40}
              width={300}
              data={{
                labels: ["2021", "2022", "2023", "2024", "2025", "2026"],
                datasets: [
                  {
                    data: assetCalc,
                    backgroundColor: "#F6C6EA",
                    borderColor: "#F6C6EA",
                    label: "Projected Asset Value",
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
