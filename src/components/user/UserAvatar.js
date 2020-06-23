import React from "react";
import { useQuery, gql } from "@apollo/client";
import { useHistory } from "react-router-dom";
import {
  Avatar,
  Badge,
  Popover,
  Statistic,
  Space,
  Button,
  Col,
  Row,
  Tag,
  message,
} from "antd";
import { GiftTwoTone, LogoutOutlined, UserOutlined } from "@ant-design/icons";

const OBTENER_USUARIO = gql`
  query obtenerUsuario {
    obtenerUsuario {
      id
      nombre
      apellido
      email
      avatar
      tipousuario
    }
  }
`;

const key = "updatable";

const UserAvatar = () => {
  const { data, loading, error } = useQuery(OBTENER_USUARIO);
  console.log(data);
  console.log(error);

  const history = useHistory();

  const logoutUser = () => {
    localStorage.removeItem("token");
    message.success({
      content: `Cerrando sesión ...`,
      key,
      duration: 2,
    });
    history.push("/");
    window.location.reload();
    data.resetStore();
  };

  if (loading) return null;

  const { nombre, apellido, avatar, tipousuario } = data.obtenerUsuario;

  const content = (
    <>
      <Row gutter={8}>
        <Col className="gutter-row" span={12}>
          {avatar ? (
            <Avatar
              src={avatar}
              size={80}
              alt={`Bienvenido, ${nombre} ${apellido}`}
            />
          ) : (
            <Avatar
              icon={<UserOutlined />}
              size={80}
              alt={`Bienvenido, ${nombre} ${apellido}`}
            />
          )}
        </Col>
        <Col className="gutter-row" span={12}>
          <h4>
            {nombre} {apellido}
          </h4>
          {tipousuario === "Administrador" ? (
            <Tag color="gold">{tipousuario}</Tag>
          ) : null}
          {tipousuario === "Gestor" ? (
            <Tag color="blue">{tipousuario}</Tag>
          ) : null}
          {tipousuario === "Desarrollador" ? (
            <Tag color="cyan">{tipousuario}</Tag>
          ) : null}
          {tipousuario === "Supervisor" ? (
            <Tag color="purple">{tipousuario}</Tag>
          ) : null}
        </Col>
      </Row>
      <Row gutter={8}>
        <Col span={12}>
          <Statistic title="Gestiones" value={0} suffix="/ 0" />
        </Col>
        <Col span={12}>
          <Statistic
            title="Bonos"
            value={0}
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
      <Space>
        <Badge count={0}>
          {avatar ? (
            <Avatar
              src={avatar}
              size="large"
              alt={`Bienvenido, ${nombre} ${apellido}`}
            />
          ) : (
            <Avatar
              icon={<UserOutlined />}
              size="large"
              alt={`Bienvenido, ${nombre} ${apellido}`}
            />
          )}
        </Badge>
        <span>
          {nombre} {apellido}
        </span>
      </Space>
    </Popover>
  );
};

export default UserAvatar;
