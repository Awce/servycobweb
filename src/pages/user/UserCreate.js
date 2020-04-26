import React, { useState } from "react";
//import UserAvatarForm from "../../forms/register/UserAvatarForm";
import { firebaseRegister } from "../../services/firebase";
import { useHistory } from "react-router-dom";
import {
  PageHeader,
  Tabs,
  Row,
  Col,
  Card,
  Button,
  Form,
  Input,
  message,
  notification,
} from "antd";
import {
  SmileOutlined,
  UserOutlined,
  MailOutlined,
  UnlockOutlined,
} from "@ant-design/icons";

const key = "updatable";
const { TabPane } = Tabs;

const UserCreate = () => {
  const [user, setUser] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    imageUrl: "",
  });

  const [error, setError] = useState(false);

  const onChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const userRegister = (e) => {
    e.preventDefault();
    if (
      name.trim() === "" ||
      lastname.trim() === "" ||
      email.trim() === "" ||
      password.trim() === ""
    ) {
      setError(true);
      message.loading({ content: "Registrando usuario...", key });
      setTimeout(() => {
        message.error({
          content: "Los campos son obliagatorios y no pueden ir vacios.",
          key,
          duration: 2,
        });
      }, 1000);
      return;
    }
    setError(!error);
    firebaseRegister(imageUrl, name, lastname, email, password)
      .then(() => {
        message.loading({ content: "Registrando usuario...", key });
        setTimeout(() => {
          message.success({
            content: "Genial.",
            key,
            duration: 2,
          });
        }, 1000);
        goBack();
        openNotification();
      })
      .catch((error) => {
        let errorCode = error.code;
        let errorMessage = error.message;
        console.log(`${errorCode}: ${errorMessage}`);
      });
  };

  const history = useHistory();

  const goBack = () => {
    history.goBack();
    setUser({
      name: "",
      lastname: "",
      email: "",
      password: "",
      imageUrl: "",
    });
  };

  const openNotification = () => {
    notification.open({
      message: "Registro exitoso",
      description: `Se ha enviado un correo a ${email}, para verificar su registro.`,
      onClick: () => {
        console.log("Notification Clicked!");
      },
    });
  };

  const { imageUrl, name, lastname, email, password } = user;

  return (
    <div
      style={{ paddingLeft: "10px", marginTop: "10px", marginRight: "10px" }}
    >
      <PageHeader
        style={{
          border: "1px solid rgb(235, 237, 240)",
        }}
        title="Empleados"
        subTitle="Alta"
        onBack={goBack}
      />
      <Tabs defaultActiveKey="1">
        <TabPane tab="PERFIL" key="1">
          <Form onSubmit={userRegister}>
            <Row gutter={16}>
              <Col span={6}>
                <Card>
                  {/* <UserAvatarForm
                    value={imageUrl}
                    name="imageUrl"
                    onChange={onChange}
                  /> */}
                </Card>
              </Col>
              <Col span={18}>
                <Card>
                  <Form.Item label="Datos del Empleado">
                    <Input
                      prefix={
                        <SmileOutlined style={{ color: "rgba(0,0,0,.25)" }} />
                      }
                      placeholder="Nombre(s)"
                      className="input-form"
                      name="name"
                      onChange={onChange}
                      value={name}
                    />
                    <Input
                      prefix={
                        <UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />
                      }
                      placeholder="Apellidos"
                      className="input-form"
                      name="lastname"
                      onChange={onChange}
                      value={lastname}
                    />
                    <Input
                      prefix={
                        <MailOutlined style={{ color: "rgba(0,0,0,.25)" }} />
                      }
                      placeholder="Correo electrónico"
                      className="input-form"
                      name="email"
                      onChange={onChange}
                      value={email}
                    />
                    <Input.Password
                      prefix={
                        <UnlockOutlined style={{ color: "rgba(0,0,0,.25)" }} />
                      }
                      type="password"
                      placeholder="Contraseña"
                      className="input-form"
                      name="password"
                      onChange={onChange}
                      value={password}
                    />
                  </Form.Item>
                  <div
                    style={{
                      right: 0,
                      bottom: 0,
                      width: "100%",
                      borderTop: "1px solid #e9e9e9",
                      padding: "10px 16px",
                      background: "#fff",
                      textAlign: "right",
                    }}
                  >
                    <Button
                      onClick={goBack}
                      size="large"
                      style={{ marginRight: 8 }}
                    >
                      Cancelar
                    </Button>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="login-form-button"
                      size="large"
                    >
                      Registrar usuario
                    </Button>
                  </div>
                </Card>
              </Col>
            </Row>
          </Form>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default UserCreate;
