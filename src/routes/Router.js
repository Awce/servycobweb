import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "../pages/home/HomePage";
import Login from "../pages/login/LoginPage";
import Summary from "../pages/application/SummaryPage";
import NotFound from "../pages/NotFound";

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/summary" component={Summary} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
