import React from "react";
import "./App.css";
import SetDisplay from "./Components/SetDisplay";
import Login from "./Components/Login";
import Loading from "./Components/Loading";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function App() {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="App">
      <Router>
        {!user ? <Login /> : <SetDisplay user={user} />}

        <Switch>
          <Route path="/liabilities">
            <h1>test</h1>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
