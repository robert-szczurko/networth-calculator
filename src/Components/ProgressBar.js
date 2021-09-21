import React from "react";
import DoneIcon from "@material-ui/icons/Done";

function ProgressBar({ selectPage, pageNum }) {
  const select = (num) => {
    selectPage(num);
  };

  return (
    <div className="progress-bar-container">
      <h3>Progress</h3>
      <p>
        {pageNum === 1 && "Welcome!"}
        {pageNum === 2 && "Nice"}
        {pageNum === 3 && "Getting There"}
        {pageNum === 4 && "Almost Done!"}
        {pageNum === 5 && "Well Done!"}
      </p>
      <div className="progress-bar">
        <div className="progress-blue" id={`s${pageNum}`}></div>
        <div id="progress-grey"></div>
        <p
          onClick={() => {
            select(1);
          }}
          className="page-number page-active">
          {pageNum > 1 ? <DoneIcon /> : "1"}
        </p>
        <p
          onClick={() => {
            select(2);
          }}
          className={
            pageNum > 1
              ? "page-number page-active"
              : "page-number page-not-active"
          }>
          {pageNum > 2 ? <DoneIcon /> : "2"}
        </p>
        <p
          onClick={() => {
            select(3);
          }}
          className={
            pageNum > 2
              ? "page-number page-active"
              : "page-number page-not-active"
          }>
          {pageNum > 3 ? <DoneIcon /> : "3"}
        </p>
        <p
          onClick={() => {
            select(4);
          }}
          className={
            pageNum > 3
              ? "page-number page-active"
              : "page-number page-not-active"
          }>
          {pageNum > 4 ? <DoneIcon /> : "4"}
        </p>
        <p
          onClick={() => {
            select(5);
          }}
          className={
            pageNum > 4
              ? "page-number page-active"
              : "page-number page-not-active"
          }>
          5
        </p>
      </div>
    </div>
  );
}

export default ProgressBar;
