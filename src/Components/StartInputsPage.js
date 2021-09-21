import React, { useState, useRef } from "react";
import "../css/StartInputsPage.css";
import NumberFormat from "react-number-format";
import { Button } from "@material-ui/core";
import ProgressBar from "./ProgressBar";
import { db } from "../firebase";

function StartInputsPage({ backPage, nextPage, pageNum, selectPage, user }) {
  const [annualIncome, setAnnualIncome] = useState(80000);
  const [savings, setSavings] = useState(50000);
  const [homeLoan, setHomeLoan] = useState(300000);
  const [homeLoanIntrest, setHomeLoanIntrest] = useState(2);
  const [creditCard, setCreditCard] = useState(10000);
  const [creditCardIntrest, setCreditCardIntrest] = useState(17);
  const [assetName1, setAssetName1] = useState("Shares");
  const [assetValue1, setAssetValue1] = useState(10000);
  const [assetName2, setAssetName2] = useState("Rental Property");
  const [assetValue2, setAssetValue2] = useState(180000);
  const [livingExpenses, setLivingExpenses] = useState(3000);
  const [goalNetWorth, setGoalNetWorth] = useState(1000000);

  const submit = () => {
    db.collection(`${user.email}`).doc("user").set({
      annualIncome: annualIncome,
      savings: savings,
      homeLoan: homeLoan,
      homeLoanIntrest: homeLoanIntrest,
      creditCard: creditCard,
      creditCardIntrest: creditCardIntrest,
      assetName1: assetName1,
      assetValue1: assetValue1,
      assetName2: assetName2,
      assetValue2: assetValue2,
      livingExpenses: livingExpenses,
      goalNetWorth: goalNetWorth,
      startUpComplete: true,
    });
  };

  const homeLoanIntrestCap = (inputObj) => {
    const { value } = inputObj;
    if (value <= 100) return true;
    setHomeLoanIntrest("100");
  };

  const creditCardIntrestCap = (inputObj) => {
    const { value } = inputObj;
    if (value <= 100) return true;
    setCreditCardIntrest("100");
  };

  return (
    <div className="start-inputs-page-container">
      <div className="start-inputs-page-inner-container">
        <div className="start-inputs-page-content">
          <div className="inputs-top">
            <img
              src="https://networthtelecom.fr/wp-content/uploads/2021/01/Logo-Netw-bleu.png"
              alt=""
            />
            <h1>Let's Get You Set Up</h1>
          </div>

          <div className="pages">
            {/* page 1 */}
            <div id="page1" className={pageNum > 1 ? "page page-hide" : "page"}>
              <h3>Annual Income</h3>
              <div
                className={
                  !annualIncome ? "input-component empty" : "input-component"
                }>
                <NumberFormat
                  thousandSeparator={true}
                  prefix={"$"}
                  id="input1"
                  value={annualIncome}
                  onChange={(e) => {
                    setAnnualIncome(
                      parseInt(e.target.value.replace(/\D/g, ""))
                    );
                  }}
                />
                <label for="input1">Amount</label>
              </div>
              <h3>Total Savings</h3>
              <div
                className={
                  !savings ? "input-component empty" : "input-component"
                }>
                <NumberFormat
                  thousandSeparator={true}
                  prefix={"$"}
                  id="input2"
                  value={savings}
                  onChange={(e) => {
                    setSavings(parseInt(e.target.value.replace(/\D/g, "")));
                  }}
                />
                <label for="input2">Amount</label>
              </div>
            </div>

            {/* page 2 */}
            <div id="page2" className={pageNum > 2 ? "page page-hide" : "page"}>
              <h3>Home Loan</h3>
              <div className="input-row">
                <div
                  className={
                    !homeLoan
                      ? "input-long input-component empty"
                      : "input-long input-component"
                  }>
                  <NumberFormat
                    thousandSeparator={true}
                    prefix={"$"}
                    id="input3"
                    value={homeLoan}
                    onChange={(e) => {
                      setHomeLoan(parseInt(e.target.value.replace(/\D/g, "")));
                    }}
                  />
                  <label for="input3">Amount</label>
                </div>
                <div
                  className={
                    !homeLoanIntrest
                      ? "input-component empty"
                      : "input-component"
                  }>
                  <NumberFormat
                    suffix=" %"
                    decimalScale={2}
                    isAllowed={homeLoanIntrestCap}
                    id="input4"
                    value={homeLoanIntrest}
                    onChange={(e) => {
                      setHomeLoanIntrest(
                        parseInt(e.target.value.replace(/\D/g, ""))
                      );
                    }}
                  />
                  <label for="input4">Intrest</label>
                </div>
              </div>
              <h3>Credit Card Debt</h3>
              <div className="input-row">
                <div
                  className={
                    !creditCard
                      ? "input-long input-component empty"
                      : "input-long input-component"
                  }>
                  <NumberFormat
                    thousandSeparator={true}
                    prefix={"$"}
                    id="input5"
                    value={creditCard}
                    onChange={(e) => {
                      setCreditCard(
                        parseInt(e.target.value.replace(/\D/g, ""))
                      );
                    }}
                  />
                  <label for="input5">Amount</label>
                </div>
                <div
                  className={
                    !creditCardIntrest
                      ? "input-component empty"
                      : "input-component"
                  }>
                  <NumberFormat
                    suffix=" %"
                    decimalScale={2}
                    isAllowed={creditCardIntrestCap}
                    id="input6"
                    value={creditCardIntrest}
                    onChange={(e) => {
                      setCreditCardIntrest(
                        parseInt(e.target.value.replace(/\D/g, ""))
                      );
                    }}
                  />
                  <label for="input6">Intrest</label>
                </div>
              </div>
            </div>

            {/* page 3 */}
            <div id="page3" className={pageNum > 3 ? "page page-hide" : "page"}>
              <h3>Assets</h3>
              <div className="input-row">
                <div
                  className={
                    !assetName1
                      ? "input-long input-component empty"
                      : "input-long input-component"
                  }>
                  <input
                    id="input7"
                    value={assetName1}
                    onChange={(e) => {
                      setAssetName1(e.target.value);
                    }}
                  />
                  <label for="input7">Name</label>
                </div>
                <div
                  className={
                    !assetValue1 ? "input-component empty" : "input-component"
                  }>
                  <NumberFormat
                    thousandSeparator={true}
                    prefix={"$"}
                    id="input8"
                    value={assetValue1}
                    onChange={(e) => {
                      setAssetValue1(
                        parseInt(e.target.value.replace(/\D/g, ""))
                      );
                    }}
                  />
                  <label for="input8">Value</label>
                </div>
              </div>
              <div className="input-row">
                <div
                  className={
                    !assetName2
                      ? "input-long input-component empty"
                      : "input-long input-component"
                  }>
                  <input
                    id="input9"
                    value={assetName2}
                    onChange={(e) => {
                      setAssetName2(e.target.value);
                    }}
                  />
                  <label for="input9">Name</label>
                </div>
                <div
                  className={
                    !assetValue2 ? "input-component empty" : "input-component"
                  }>
                  <NumberFormat
                    thousandSeparator={true}
                    prefix={"$"}
                    id="input10"
                    value={assetValue2}
                    onChange={(e) => {
                      setAssetValue2(
                        parseInt(e.target.value.replace(/\D/g, ""))
                      );
                    }}
                  />
                  <label for="input10">Value</label>
                </div>
              </div>
            </div>

            {/* page 4 */}
            <div id="page4" className={pageNum > 4 ? "page page-hide" : "page"}>
              <h3>Monthly Living Expenses</h3>
              <div
                className={
                  !livingExpenses ? "input-component empty" : "input-component"
                }>
                <NumberFormat
                  thousandSeparator={true}
                  prefix={"$"}
                  id="input11"
                  value={livingExpenses}
                  onChange={(e) => {
                    setLivingExpenses(
                      parseInt(e.target.value.replace(/\D/g, ""))
                    );
                  }}
                />
                <label for="input11">Amount</label>
              </div>
            </div>

            {/* page 5 */}
            <div id="page5" className={pageNum > 5 ? "page page-hide" : "page"}>
              <h3>What is Your Goal Networth?</h3>
              <div
                className={
                  !goalNetWorth ? "input-component empty" : "input-component"
                }>
                <NumberFormat
                  thousandSeparator={true}
                  prefix={"$"}
                  id="input11"
                  value={goalNetWorth}
                  onChange={(e) => {
                    setGoalNetWorth(
                      parseInt(e.target.value.replace(/\D/g, ""))
                    );
                  }}
                />
                <label for="input11">Amount</label>
              </div>
            </div>
          </div>

          <div className="start-btns">
            <Button
              variant="contained"
              onClick={backPage}
              disabled={pageNum === 1}>
              Back
            </Button>
            {pageNum === 5 ? (
              <Button
                variant="contained"
                color="primary"
                onClick={submit}
                disabled={!goalNetWorth}>
                Submit
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={nextPage}
                disabled={
                  (pageNum === 1 && (!annualIncome || !savings)) ||
                  (pageNum === 2 &&
                    (!homeLoan ||
                      !creditCard ||
                      !homeLoanIntrest ||
                      !creditCardIntrest)) ||
                  (pageNum === 3 &&
                    (!assetName1 ||
                      !assetValue1 ||
                      !assetName2 ||
                      !assetValue2)) ||
                  (pageNum === 4 && !livingExpenses)
                }>
                Next
              </Button>
            )}
          </div>
        </div>
      </div>
      <ProgressBar selectPage={selectPage} pageNum={pageNum} />
    </div>
  );
}

export default StartInputsPage;
