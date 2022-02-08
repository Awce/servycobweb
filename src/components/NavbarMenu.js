import React from "react";
import { Row, Col, Space } from "antd";
import UserAvatar from "./user/UserAvatar";
//import LogoCompany from "./LogoCompany";
import UserNotifications from "./user/UserNotifications";
import UserEmails from "./user/UserEmails";
import UserMessages from "./user/UserMessages";

const NavbarMenu = () => {
  return (
    <Row style={{ marginRight: "10px" }}>
      <Col span={18} push={6}>
        <Row justify="end">
          <Space size="middle">
            <UserMessages />
            <UserEmails />
            <UserNotifications />
            <UserAvatar />
          </Space>
        </Row>
      </Col>
      <Col span={4} pull={18}>
        <Row justify="center">{/* <LogoCompany /> */}</Row>
      </Col>
    </Row>
  );
};

export default NavbarMenu;
