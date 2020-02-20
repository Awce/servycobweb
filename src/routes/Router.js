import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "../pages/home/HomePage";
import Login from "../pages/login/LoginPage";
import Register from "../pages/register/RegisterPage";
import Summary from "../pages/application/SummaryPage";
import Customer from "../pages/customer/CustomerPage";
import CustomerDetails from "../pages/customer/CustomerDetail";
import NotFound from "../pages/NotFound";

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/summary" component={Summary} />
        <Route exact path="/customers" component={Customer} />
        <Route exact path="/customers/:Id" component={CustomerDetails} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
