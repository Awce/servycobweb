import React from "react";
import * as Yup from "yup";
import Loading from "../../components/Loading";
import { useFormik } from "formik";
import { useMutation, gql } from "@apollo/client";
import { useHistory } from "react-router-dom";
import {
  PageHeader,
  Row,
  Col,
  Card,
  Button,
  Form,
  Input,
  Alert,
  message,
  notification,
} from "antd";
import { UserOutlined, UnlockOutlined, MailOutlined } from "@ant-design/icons";

const layout = {
  labelCol: {
    span: 24,
  },
  wrapperCol: {
    span: 24,
  },
};

const UserCreate = () => {
  const formik = useFormik({
    initialValues: {
      nombre: "",
      apellido: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      nombre: Yup.string().required(
        "El nombre o los nombres del nuevo usuario no pueden ir vacios y son requeridos"
      ),
      apellido: Yup.string().required(
        "El apellido o los apellidos del nuevo usuario no pueden ir vacios y son requeridos"
      ),
      email: Yup.string()
        .email("El email no es válido")
        .required("El email es obligatorio"),
      password: Yup.string()
        .required("La contraseña no puede ir vacia")
        .min(6, "6 caracteres como mínimo"),
    }),
    onSubmit: (valores) => {
      console.log("enviando");
      console.log(valores);
    },
  });

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const history = useHistory();

  const goBack = () => {
    history.goBack();
  };

  const openNotification = () => {
    notification.open({
      message: "Registro exitoso",
      description: `Se ha enviado un correo a ${formik.values.email}, para verificar su registro.`,
      onClick: () => {
        console.log("Notification Clicked!");
      },
    });
  };

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

      <div style={{ marginTop: "3px" }}>
        <Form
          {...layout}
          onFinish={formik.handleSubmit}
          onFinishFailed={onFinishFailed}
        >
          <Row gutter={16}>
            <Col span={6}>
              <Card style={{ width: 250 }} />
            </Col>
            <Col span={18}>
              <Card>
                <Form.Item label="Nombre(s)">
                  <Input
                    placeholder="Nombre(s)"
                    className="input-form"
                    name="nombre"
                    prefix={
                      <UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    value={formik.values.nombre}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.nombre && formik.errors.nombre ? (
                    <Alert
                      message={formik.errors.nombre}
                      type="error"
                      showIcon
                    />
                  ) : null}
                </Form.Item>
                <Form.Item label="Apellido(s)">
                  <Input
                    placeholder="Apellido(s)"
                    className="input-form"
                    name="apellido"
                    value={formik.values.apellido}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.apellido && formik.errors.apellido ? (
                    <Alert
                      message={formik.errors.apellido}
                      type="error"
                      showIcon
                    />
                  ) : null}
                </Form.Item>
                <Form.Item label="Email">
                  <Input
                    placeholder="Correo electrónico"
                    className="input-form"
                    name="email"
                    prefix={
                      <MailOutlined style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <Alert
                      message={formik.errors.email}
                      type="error"
                      showIcon
                    />
                  ) : null}
                </Form.Item>
                <Form.Item label="Contraseña">
                  <Input.Password
                    placeholder="Contraseña"
                    className="input-form"
                    name="password"
                    prefix={
                      <UnlockOutlined style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <Alert
                      message={formik.errors.password}
                      type="error"
                      showIcon
                    />
                  ) : null}
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
      </div>
    </div>
  );
};

export default UserCreate;
