import React from "react";
import Sidebar from "./Sidebar";
import Dashboard from "./Dashboard";
import Liabilities from "./Liabilities";
import Assets from "./Assets";
import Savings from "./Savings";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

function AppBody({ sideBarWidth, user, closeSideBar }) {
  return (
    <div className="app-body">
      <Router>
        <Sidebar sideBarWidth={sideBarWidth} closeSideBar={closeSideBar} />

        <Switch>
          <Route path="/" exact>
            <Dashboard user={user} />
          </Route>
          <Route path="/assets" exact>
            <Assets user={user} />
          </Route>
          <Route path="/savings">
            <Savings user={user} />
          </Route>
          <Route path="/liabilities">
            <Liabilities user={user} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default AppBody;
