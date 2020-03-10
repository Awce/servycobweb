import React, { useState } from "react";
import UserAvatarForm from "./UserAvatarForm";
import { useHistory } from "react-router-dom";
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

  const onChange = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  let history = useHistory();

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
    setError(false);
    firebaseRegister(imageUrl, name, lastname, email, password)
      .then(() => {
        message.loading({ content: "Registrando usuario...", key });
        setTimeout(() => {
          history.push("/");
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
      <p>
        Al crear una cuenta estás aceptando los Términos de Servicio y
        Privacidad.
      </p>
    </Form>
  );
};

export default RegisterForm;
