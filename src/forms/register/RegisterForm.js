import React, { useState } from "react";
import { Form, Icon, Input, Button, message, notification } from "antd";

const key = "updatable";

const RegisterForm = () => {
  const [user, setUser] = useState({
    name: "",
    lastname: "",
    email: "",
    password: ""
  });

  const [error, setError] = useState(false);

  const onChange = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const { name, lastname, email, password } = user;

  const userRegister = e => {
    e.preventDefault();
    console.log("registrando");
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
    setError(false);
    message.loading({ content: "Registrando usuario...", key });
    setTimeout(() => {
      message.success({
        content: "Genial.",
        key,
        duration: 2
      });
    }, 1000);
  };

  const openNotification = () => {
    notification.open({
      message: "Notification Title",
      description:
        "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
      onClick: () => {
        console.log("Notification Clicked!");
      }
    });
  };

  return (
    <Form onSubmit={userRegister}>
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
        placeholder="Correo"
        className="input-form"
        name="email"
        onChange={onChange}
        value={email}
      />
      <Input
        prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
        type="password"
        placeholder="Contraseña"
        className="input-form"
        name="password"
        onChange={onChange}
        value={password}
      />
      <Button
        type="primary"
        htmlType="submit"
        className="login-form-button"
        size="large"
        block
        onClick={openNotification}
      >
        Registrar usuario
      </Button>
    </Form>
  );
};

export default RegisterForm;
