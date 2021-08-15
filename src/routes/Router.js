import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Layout } from "antd";
import Login from "../pages/login/LoginPage";
import Summary from "../pages/summary/SummaryPage";
import Customers from "../pages/customer/CustomersList";
import CustomerCreate from "../pages/customer/CustomerCreate";
import CustomerDetails from "../pages/customer/CustomerDetail";
import NotFound from "../pages/NotFound";
import NavbarMenu from "../components/NavbarMenu";
import LateralMenu from "../components/LateralMenu";
import EmptyPage from "../pages/EmptyPage";
import Assignments from "../pages/assignments/Assignments";
import AssignmentDetails from "../pages/assignments/AssignmentDetails";
import AssignmentCreate from "../pages/assignments/AssignmentCreate";
import AssignmentVerify from "../pages/assignments/AssignmentVerify";
import AssignmentUpload from "../pages/assignments/AssignmentUpload";
import UsersList from "../pages/user/UsersList";
import UserCreate from "../pages/user/UserCreate";
import UserDetails from "../pages/user/UserDetails";
import DictationsList from "../pages/dictations/DictationsList";
import DictationCreate from "../pages/dictations/DictationCreateDetail";
import DictationsUserList from "../pages/dictations/DictationsUserList";
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
              <Route exact path="/asignaciones" component={Assignments} />
              <Route
                exact
                path="/asignaciones/damas/:Id"
                component={AssignmentDetails}
              />
              <Route
                exact
                path="/asignaciones/nueva"
                component={AssignmentCreate}
              />
              <Route
                exact
                path="/asignaciones/verificar"
                component={AssignmentVerify}
              />
              <Route
                exact
                path="/asignaciones/subir"
                component={AssignmentUpload}
              />
              <Route exact path="/empleados" component={UsersList} />
              <Route exact path="/empelados/alta" component={UserCreate} />
              <Route exact path="/empleados/:Id" component={UserDetails} />
              <Route exact path="/dictaminaciones" component={DictationsList} />
              <Route
                exact
                path="/dictaminaciones/crear"
                component={DictationCreate}
              />
              <Route exact path="/gestiones" component={DictationsUserList} />
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
        <PrivateRouter />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
