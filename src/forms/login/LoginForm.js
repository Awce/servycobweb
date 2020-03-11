import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Form, Icon, Input, Button, Card, Row, Col, message } from "antd";
import { firebaseLogin } from "../../services/firebase";
import Logo from "../../components/LogoWhite";

const key = "updatable";

const LoginForm = () => {
  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState(false);

  let history = useHistory();

  const onChange = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const userLogin = e => {
    e.preventDefault();
    if (email.trim() === "" || password.trim() === "") {
      setError(true);
      message.loading({ content: "Iniciando sesión...", key });
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
    firebaseLogin(email, password)
      .then(() => {
        message.loading({ content: "Iniciando sesión...", key });
        setTimeout(() => {
          history.push("/summary");
          message.success({
            content: `Bienvenido, ${email}`,
            key,
            duration: 2
          });
        }, 1000);
      })
      .catch(error => {
        console.log(error.code, error.message);
        message.error({
          content:
            "La contraseña no es válida o el usuario no tiene una cuenta.",
          key,
          duration: 2
        });
      });
  };

  const { email, password } = user;

  return (
    <Card style={{ width: 600, background: "gray" }}>
      <Row justify="center">
        <Col span={12} offset={6}>
          <Logo />
        </Col>
      </Row>

      <Form className="login-form" onSubmit={userLogin}>
        <Input
          prefix={<Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />}
          placeholder="Ingresa tu correo"
          className="input-form"
          name="email"
          onChange={onChange}
          value={email}
        />
        <Input.Password
          prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
          type="password"
          placeholder="Ingresa tu contraseña"
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
        >
          Ingresar
        </Button>
      </Form>
    </Card>
  );
};

export default LoginForm;
