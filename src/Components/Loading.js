import React from "react";
import Spinner from "react-spinkit";
import "../css/Loading.css";

function Loading() {
  return (
    <div className="app-loading">
      <div className="app-loading-contents">
        <img
          src="https://networthtelecom.fr/wp-content/uploads/2021/01/Logo-Netw-bleu.png"
          alt=""
        />
        <h2 className="app-loading-title">CALCULATOR</h2>
        <Spinner
          name="ball-spin-fade-loader"
          color="rgb(0 159 209)"
          fadeIn="none"
        />
      </div>
    </div>
  );
}

export default Loading;
