import React from "react";
import { Layout } from "antd";
import LoginForm from "../../forms/login/LoginForm";

const { Content } = Layout;

const LoginPage = () => {
  return (
    <Layout
      style={{ minHeight: "100vh", alignItems: "center" }}
      className="bg-image"
    >
      <Content style={{ paddingTop: "200px" }}>
        <LoginForm />
      </Content>
    </Layout>
  );
};

export default LoginPage;
