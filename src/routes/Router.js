import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Layout } from "antd";
import Home from "../pages/home/HomePage";
import Login from "../pages/login/LoginPage";
import Register from "../pages/register/RegisterPage";
import Summary from "../pages/summary/SummaryPage";
import Customers from "../pages/customer/CustomersList";
import CustomersDetails from "../pages/customer/CustomerDetail";
import NotFound from "../pages/NotFound";
import NavbarMenu from "../components/NavbarMenu";
import LateralMenu from "../components/LateralMenu";

const { Header, Sider, Content } = Layout;

const PrivateRouter = () => {
  return (
    <Router>
      <Layout>
        <Header style={{ background: "#fff" }}>
          <Content>
            <NavbarMenu />
          </Content>
        </Header>
        <Layout>
          <Sider collapsible style={{ marginTop: "1px" }} theme="light">
            <LateralMenu />
          </Sider>
          <Content
            style={{
              marginTop: "1px",
              padding: 0,
              background: "#fff"
            }}
          >
            <Switch>
              <Route exact path="/summary" component={Summary} />
              <Route exact path="/customers" component={Customers} />
              <Route exact path="/customers/:Id" component={CustomersDetails} />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
};

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <PrivateRouter />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
