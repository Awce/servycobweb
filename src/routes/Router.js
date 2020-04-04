import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Layout } from "antd";
import Home from "../pages/home/HomePage";
import Login from "../pages/login/LoginPage";
import Register from "../pages/register/RegisterPage";
import Summary from "../pages/summary/SummaryPage";
import Customers from "../pages/customer/CustomersList";
import CustomerCreate from "../pages/customer/CustomerCreate";
import CustomerDetails from "../pages/customer/CustomerDetail";
import NotFound from "../pages/NotFound";
import NavbarMenu from "../components/NavbarMenu";
import LateralMenu from "../components/LateralMenu";
import EmptyPage from "../pages/EmptyPage";
import AssignmentsUpload from "../pages/assignments/AssignmentsUpload";
import AssignmentsList from "../pages/assignments/AssignmentsList";
import AssignmentDetails from "../pages/assignments/AssignmentDetails";
import UsersList from "../pages/user/UsersList";
import UserCreate from "../pages/user/UserCreate";
import UserDetails from "../pages/user/UserDetails";
import DictationsList from "../pages/dictations/DictationsList";
import PaysList from "../pages/pays/PaysList";
import SummaryList from "../pages/summary/SummaryList";

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
              background: "#fff",
            }}
          >
            <Switch>
              <Route exact path="/informacion" component={Summary} />
              <Route exact path="/clientes" component={Customers} />
              <Route exact path="/clientes/alta" component={CustomerCreate} />
              <Route exact path="/clientes/:Id" component={CustomerDetails} />
              <Route exact path="/gestiones" component={AssignmentsList} />
              <Route
                exact
                path="/gestiones/damas/:Id"
                component={AssignmentDetails}
              />
              <Route exact path="/asignaciones" component={AssignmentsUpload} />
              <Route exact path="/empleados" component={UsersList} />
              <Route exact path="/empelados/alta" component={UserCreate} />
              <Route exact path="/empleados/:Id" component={UserDetails} />
              <Route exact path="/dictaminaciones" component={DictationsList} />
              <Route exact path="/pagos" component={PaysList} />
              <Route exact path="/resumen" component={SummaryList} />
              <Route component={EmptyPage} />
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
        <Route exact path="/" component={Login} />
        <Route exact path="/registro" component={Register} />
        <Route exact path="/admin" component={Home} />
        <PrivateRouter />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
