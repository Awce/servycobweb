import React from "react";
import CustomersList from "../../pages/customer/CustomersList";
import { Layout } from "antd";
import LateralMenu from "../../components/LateralMenu";
import NavbarMenu from "../../components/NavbarMenu";

const { Header, Sider, Content } = Layout;

const CustomerLayout = () => {
  return (
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
          <div style={{ paddingLeft: "10px", marginTop: "10px" }}>
            <h1>Clientes</h1>
            <CustomersList />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default CustomerLayout;
