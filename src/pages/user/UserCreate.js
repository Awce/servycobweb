import React from "react";
import * as Yup from "yup";
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

const key = "updatable";

const NUEVA_CUENTA = gql`
  mutation nuevoUsario($input: UsuarioInput) {
    nuevoUsuario(input: $input) {
      id
      nombre
      apellido
      email
    }
  }
`;

const OBTENER_USUARIOS = gql`
  query obtenerUsuarios {
    obtenerUsuarios {
      id
      nombre
      apellido
      email
      creado
      tipousuario
      avatar
    }
  }
`;

const UserCreate = () => {
  const [nuevoUsuario] = useMutation(NUEVA_CUENTA, {
    update(cache, { data: { nuevoUsuario } }) {
      const { obtenerUsuarios } = cache.readQuery({ query: OBTENER_USUARIOS });
      cache.writeQuery({
        query: OBTENER_USUARIOS,
        data: { obtenerUsuarios: [...obtenerUsuarios, nuevoUsuario] },
      });
    },
  });
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
    onSubmit: async (valores) => {
      const { nombre, apellido, email, password } = valores;
      try {
        const { data } = await nuevoUsuario({
          variables: {
            input: {
              nombre,
              apellido,
              email,
              password,
            },
          },
        });
        notification.open({
          message: "Registro exitoso",
          description: `${data.nuevoUsuario.nombre}, se ha registrado con el correo ${data.nuevoUsuario.email}, ya puede iniciar sesión con su registro.`,
          onClick: () => {
            console.log("Notification Clicked!");
          },
        });
        goBack();
      } catch (error) {
        setTimeout(() => {
          const mesError = error.message.replace("GraphQL error: ", "");
          message.error({
            content: `${mesError} en la base de datos.`,
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

  const history = useHistory();

  const goBack = () => {
    history.goBack();
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
              <Card />
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
                    allowClear
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
                    allowClear
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
                    allowClear
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
                    allowClear
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
