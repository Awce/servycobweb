import React from "react";
import { Row, Col, Badge, Icon } from "antd";
import UserAvatar from "./user/UserAvatar";
import LogoCompany from "./LogoCompany";

const NavbarMenu = () => {
  return (
    <Row>
      <Col justify="end" span={18} push={6}>
        <Row gutter={[16, 16]}>
          <Col span={6} />
          <Col span={6} />
          <Col span={6}>
            <Col span={6}>
              <Badge count={2} dot>
                <Icon style={{ fontSize: "24px" }} type="message" />
              </Badge>
            </Col>
            <Col span={6}>
              <Badge count={2} dot>
                <Icon style={{ fontSize: "24px" }} type="mail" />
              </Badge>
            </Col>
            <Col span={6}>
              <Badge count={2} dot>
                <Icon style={{ fontSize: "24px" }} type="notification" />
              </Badge>
            </Col>
          </Col>
          <Col span={6}>
            <UserAvatar />
          </Col>
        </Row>
      </Col>
      <Col justify="center" span={6} pull={18}>
        <LogoCompany />
      </Col>
    </Row>
  );
};

export default NavbarMenu;
