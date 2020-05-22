import React from "react";
import * as Yup from "yup";
import "bulma/css/bulma.css";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";
import { useMutation, gql } from "@apollo/client";
import { Alert, Form, Input, Button, Card, message } from "antd";
import Logo from "../../components/LogoWhite";
import { MailOutlined, UnlockOutlined, LoginOutlined } from "@ant-design/icons";

const layout = {
  wrapperCol: {
    span: 24,
  },
};

const AUTENTICAR_USUARIO = gql`
  mutation autenticarUsuario($input: AutenticarInput) {
    autenticarUsuario(input: $input) {
      token
    }
  }
`;

const key = "updatable";

const LoginForm = () => {
  const [autenticarUsuario] = useMutation(AUTENTICAR_USUARIO);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("El email no es válido")
        .required("El email es obligatorio"),
      password: Yup.string().required("La contraseña no puede ir vacia"),
    }),
    onSubmit: async (valores) => {
      const { email, password } = valores;

      try {
        const { data } = await autenticarUsuario({
          variables: {
            input: {
              email,
              password,
            },
          },
        });
        message.loading({ content: "Iniciando sesión...", key });
        const { token } = data.autenticarUsuario;
        localStorage.setItem("token", token);
        setTimeout(() => {
          history.push("/informacion");
          message.success({
            content: `Bienvenido a ServyCob, ${email}`,
            key,
            duration: 2,
          });
        }, 1000);
      } catch (error) {
        setTimeout(() => {
          const mesError = error.message.replace("GraphQL error: ", "");
          message.error({
            content: `${mesError}`,
            key,
            duration: 2,
          });
        }, 1000);
      }
    },
  });

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  let history = useHistory();

  return (
    <Card style={{ background: "gray" }}>
      <div className="container is-fluid">
        <div
          className="level-item has-text-centered"
          style={{ marginBottom: "10px" }}
        >
          <Logo />
        </div>
      </div>

      <Form
        {...layout}
        className="login-form"
        onFinish={formik.handleSubmit}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item>
          <Input
            prefix={<MailOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="Ingresa tu correo"
            className="input-form"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email ? (
            <Alert message={formik.errors.email} type="error" showIcon />
          ) : null}
        </Form.Item>
        <Form.Item>
          <Input.Password
            prefix={<UnlockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="Ingresa tu contraseña"
            className="input-form"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password ? (
            <Alert message={formik.errors.password} type="error" showIcon />
          ) : null}
        </Form.Item>
        <div>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            size="large"
            block
            icon={<LoginOutlined />}
          >
            Ingresar
          </Button>
        </div>
      </Form>
    </Card>
  );
};

export default LoginForm;
