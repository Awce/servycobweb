import React from "react";
import { Avatar, Badge, Popover, Statistic, Button, Col, Row } from "antd";
import { GiftTwoTone, LogoutOutlined } from "@ant-design/icons";

const UserAvatar = () => {
  const logoutUser = () => {
    console.log("Cerrando sesion");
  };

  const content = (
    <>
      <Row gutter={8}>
        <Col className="gutter-row" span={12}>
          <Avatar
            src="https://firebasestorage.googleapis.com/v0/b/servycob-app.appspot.com/o/avatars%2Fyo.jpeg?alt=media&token=e44759d8-3a24-4edc-a873-f427bf5fa430"
            size={80}
            alt={`Bienvenido, Raúl Hernández`}
          />
        </Col>
        <Col className="gutter-row" span={12}>
          <h4>Raúl Hernández</h4>
          <h6>Developer</h6>
        </Col>
      </Row>
      <Row gutter={8}>
        <Col span={12}>
          <Statistic title="Gestiones" value={3} suffix="/ 10" />
        </Col>
        <Col span={12}>
          <Statistic
            title="Bonos"
            value={128}
            prefix={<GiftTwoTone twoToneColor="#eb2f96" />}
          />
        </Col>
      </Row>
      <Row span={24}>
        <Col span={24}>
          <Button onClick={logoutUser} icon={<LogoutOutlined />} block>
            Cerrar sesion
          </Button>
        </Col>
      </Row>
    </>
  );

  return (
    <Popover content={content}>
      <Badge count={0}>
        <Avatar
          src="https://firebasestorage.googleapis.com/v0/b/servycob-app.appspot.com/o/avatars%2Fyo.jpeg?alt=media&token=e44759d8-3a24-4edc-a873-f427bf5fa430"
          size="large"
          alt={`Bienvenido, Raúl Hernández`}
        />
      </Badge>
      <span> Raúl Hernández</span>
    </Popover>
  );
};

export default UserAvatar;
