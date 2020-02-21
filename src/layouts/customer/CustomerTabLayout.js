import React from "react";
import { Layout } from "antd";
import LateralMenu from "../../components/LateralMenu";
import NavbarMenu from "../../components/NavbarMenu";
import CustomerDetail from "../../pages/customer/CustomerDetail";

const { Header, Sider, Content } = Layout;

function componentName() {
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
          <div style={{ paddingLeft: "10px" }}>
            <CustomerDetail />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default componentName;
