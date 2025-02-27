import React, { useState } from "react";
import UserAvatarForm from "../../forms/register/UserAvatarForm";
import { Drawer, Button, Form, Input, message, notification } from "antd";
import { firebaseRegister } from "../../services/firebase";
import {
  UserAddOutlined,
  UserOutlined,
  MailOutlined,
  SmileOutlined,
  UnlockOutlined,
} from "@ant-design/icons";

const key = "updatable";

const RegisterUserButton = () => {
  const [user, setUser] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    imageUrl: "",
  });

  const [error, setError] = useState(false);

  const [show, setShow] = useState({
    visible: false,
  });

  const showDrawer = () => {
    setShow({
      visible: true,
    });
  };

  const onClose = () => {
    setShow({
      visible: false,
    });
    setUser({
      name: "",
      lastname: "",
      email: "",
      password: "",
      imageUrl: "",
    });
  };

  const { visible } = show;

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
        onClose();
        message.loading({ content: "Registrando usuario...", key });
        setTimeout(() => {
          message.success({
            content: "Genial.",
            key,
            duration: 2,
          });
        }, 1000);
      })
      .catch((error) => {
        let errorCode = error.code;
        let errorMessage = error.message;
        console.log(`${errorCode}: ${errorMessage}`);
      });
  };

  const openNotification = () => {
    if (error) {
      notification.open({
        message: "Registro exitoso",
        description: `Se ha enviado un correo a ${email}, para verificar su registro.`,
        onClick: () => {
          console.log("Notification Clicked!");
        },
      });
    }
  };

  const { imageUrl, name, lastname, email, password } = user;

  return (
    <div>
      <Button type="primary" onClick={showDrawer} icon={<UserAddOutlined />}>
        Crear nuevo usuario
      </Button>
      <Drawer
        title="Crear nuevo usuario"
        width={720}
        bodyStyle={{ paddingBottom: 80 }}
        onClose={onClose}
        visible={visible}
      >
        <Form onSubmit={userRegister}>
          <UserAvatarForm
            value={imageUrl}
            name="imageUrl"
            onChange={onChange}
          />
          <Input
            prefix={<SmileOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="Nombre(s)"
            className="input-form"
            name="name"
            onChange={onChange}
            value={name}
          />
          <Input
            prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="Apellidos"
            className="input-form"
            name="lastname"
            onChange={onChange}
            value={lastname}
          />
          <Input
            prefix={<MailOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="Correo electrónico"
            className="input-form"
            name="email"
            onChange={onChange}
            value={email}
          />
          <Input.Password
            prefix={<UnlockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
            type="password"
            placeholder="Contraseña"
            className="input-form"
            name="password"
            onChange={onChange}
            value={password}
          />
          <div
            style={{
              position: "absolute",
              right: 0,
              bottom: 0,
              width: "100%",
              borderTop: "1px solid #e9e9e9",
              padding: "10px 16px",
              background: "#fff",
              textAlign: "right",
            }}
          >
            <Button onClick={onClose} size="large" style={{ marginRight: 8 }}>
              Cancelar
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              size="large"
              onClick={openNotification}
            >
              Registrar usuario
            </Button>
          </div>
        </Form>
      </Drawer>
    </div>
  );
};

export default RegisterUserButton;
