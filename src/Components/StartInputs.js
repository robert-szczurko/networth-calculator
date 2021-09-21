import React, { useState } from "react";
import "../css/StartInputs.css";
import StartInputsPage from "./StartInputsPage";
import firebase from "firebase";
import { db } from "../firebase";

function StartInputs({ user }) {
  const [page, setPage] = useState(1);

  const nextPage = () => {
    setPage(page + 1);
  };
  const backPage = () => {
    setPage(page - 1);
  };
  const selectPage = (num) => {
    setPage(num);
  };

  return (
    <div className="start-inputs-container">
      <StartInputsPage
        user={user}
        nextPage={nextPage}
        backPage={backPage}
        pageNum={page}
        selectPage={selectPage}
      />
    </div>
  );
}

export default StartInputs;
