import React from "react";
import { Row, Col, Space } from "antd";
import UserAvatar from "./user/UserAvatar";
import LogoCompany from "./LogoCompany";
import UserNotifications from "./user/UserNotifications";
import UserEmails from "./user/UserEmails";
import UserMessages from "./user/UserMessages";

const NavbarMenu = () => {
  return (
    <Row>
      <Col justify="end" span={18} push={6}>
        <Row gutter={[16, 16]}>
          <Col span={8} />
          <Col span={6}>
            <Space>
              <Col span={6}>
                <UserMessages />
              </Col>
              <Col span={6}>
                <UserEmails />
              </Col>
              <Col span={6}>
                <UserNotifications />
              </Col>
            </Space>
          </Col>
          <Col span={8}>
            <UserAvatar />
          </Col>
        </Row>
      </Col>
      <Col className="logo-company" justify="center" span={6} pull={18}>
        <LogoCompany />
      </Col>
    </Row>
  );
};

export default NavbarMenu;
