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
      <Content style={{ position: "fixed", paddingTop: "80px" }}>
        <LoginForm />
      </Content>
    </Layout>
  );
};

export default LoginPage;
