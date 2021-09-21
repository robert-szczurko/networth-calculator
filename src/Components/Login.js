import React from "react";
import "../css/Login.css";
import { Button } from "@material-ui/core";
import { auth, provider } from "../firebase";

function Login() {
  const signIn = (e) => {
    e.preventDefault();
    auth.signInWithPopup(provider).catch((error) => alert(error.message));
  };
  return (
    <div className="login-container">
      <div className="login-inner-container">
        <img
          src="https://networthtelecom.fr/wp-content/uploads/2021/01/Logo-Netw-bleu.png"
          alt=""
        />
        <h2 className="app-loading-title">CALCULATOR</h2>

        <Button variant="outlined" color="primary" onClick={signIn}>
          Sign in with Google
        </Button>
      </div>
    </div>
  );
}

export default Login;
