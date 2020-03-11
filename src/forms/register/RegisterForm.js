import React, { useState } from "react";
import UserAvatarForm from "./UserAvatarForm";
import { Form, Icon, Input, Button, message, notification } from "antd";
import { firebaseRegister } from "../../services/firebase";

const key = "updatable";

const RegisterForm = () => {
  const [user, setUser] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    imageUrl: ""
  });

  const [error, setError] = useState(false);

  const [show, setShow] = useState({
    visible: false
  });

  const onChange = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const onClose = () => {
    setShow({
      visible: false
    });
    setUser({
      name: "",
      lastname: "",
      email: "",
      password: "",
      imageUrl: ""
    });
  };

  const { visible } = show;

  const userRegister = e => {
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
          duration: 2
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
            duration: 2
          });
        }, 1000);
      })
      .catch(error => {
        let errorCode = error.code;
        let errorMessage = error.message;
        console.log(`${errorCode}: ${errorMessage}`);
      });
  };

  const openNotification = () => {
    notification.open({
      message: "Registro exitoso",
      description: `Se ha enviado un correo a ${email}, para verificar su registro.`,
      onClick: () => {
        console.log("Notification Clicked!");
      }
    });
  };

  const { imageUrl, name, lastname, email, password } = user;

  return (
    <Form onSubmit={userRegister}>
      <UserAvatarForm value={imageUrl} name="imageUrl" onChange={onChange} />
      <Input
        prefix={<Icon type="smile" style={{ color: "rgba(0,0,0,.25)" }} />}
        placeholder="Nombre(s)"
        className="input-form"
        name="name"
        onChange={onChange}
        value={name}
      />
      <Input
        prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
        placeholder="Apellidos"
        className="input-form"
        name="lastname"
        onChange={onChange}
        value={lastname}
      />
      <Input
        prefix={<Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />}
        placeholder="Correo electrónico"
        className="input-form"
        name="email"
        onChange={onChange}
        value={email}
      />
      <Input.Password
        prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
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
          textAlign: "right"
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
  );
};

export default RegisterForm;
