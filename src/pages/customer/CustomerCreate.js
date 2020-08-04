import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useMutation, gql } from "@apollo/client";
import { useHistory } from "react-router-dom";
import {
  PageHeader,
  Alert,
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
  PhoneOutlined,
  MailOutlined,
  GlobalOutlined,
  UserAddOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";

const layout = {
  labelCol: {
    span: 24,
  },
  wrapperCol: {
    span: 24,
  },
};

const key = "updatable";
const { TabPane } = Tabs;

const NUEVO_CLIENTE = gql`
  mutation nuevoCliente($input: ClienteInput) {
    nuevoCliente(input: $input) {
      razonsocial
      empresa
      email
      telefono
      direccion
      creado
      rfc
      id
    }
  }
`;

const OBTENER_CLIENTES = gql`
  query obtenerClientes {
    obtenerClientes {
      id
      empresa
      razonsocial
      rfc
      direccion
      email
      telefono
      logo
      web
    }
  }
`;

const CustomerCreate = () => {
  const [nuevoCliente] = useMutation(NUEVO_CLIENTE, {
    update(cache, { data: { nuevoCliente } }) {
      // obteber cache
      const { obtenerClientes } = cache.readQuery({ query: OBTENER_CLIENTES });
      // reescribimos cache no es mutable
      cache.writeQuery({
        query: OBTENER_CLIENTES,
        data: { obtenerClientes: [...obtenerClientes, nuevoCliente] },
      });
    },
  });

  const formik = useFormik({
    initialValues: {
      razonsocial: "",
      empresa: "",
      email: "",
      telefono: "",
      direccion: "",
      rfc: "",
    },
    validationSchema: Yup.object({
      razonsocial: Yup.string().required(
        "El nombre de la Razón social no puede ir vacio y es requerido"
      ),
      empresa: Yup.string().required(
        "El nombre de la Empresa no puede ir vacio y es requerido"
      ),
      email: Yup.string()
        .email("El email no es válido")
        .required("El email es obligatorio"),
      direccion: Yup.string().required(
        "La dirección no puede ir vacia y es requerida."
      ),
    }),
    onSubmit: async (valores) => {
      const { razonsocial, empresa, email, telefono, direccion, rfc } = valores;
      try {
        const { data } = await nuevoCliente({
          variables: {
            input: {
              razonsocial,
              empresa,
              email,
              telefono,
              direccion,
              rfc,
            },
          },
        });
        notification.open({
          message: "Registro exitoso",
          description: `${data.nuevoCliente.razonsocial}, se ha registrado con éxito.`,
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
        title="Clientes"
        subTitle="Alta"
        onBack={goBack}
      />
      <Tabs defaultActiveKey="1">
        <TabPane tab="PERFIL" key="1">
          <Form
            {...layout}
            onFinish={formik.handleSubmit}
            onFinishFailed={onFinishFailed}
          >
            <Row gutter={16}>
              <Col span={6}>
                <Card></Card>
              </Col>
              <Col span={18}>
                <Card>
                  <Form.Item label="Datos de la Empresa">
                    <Row gutter={16}>
                      <Col span={24}>
                        <Input
                          placeholder="Razón social"
                          className="input-form"
                          name="razonsocial"
                          allowClear
                          value={formik.values.razonsocial}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.touched.razonsocial &&
                        formik.errors.razonsocial ? (
                          <Alert
                            message={formik.errors.razonsocial}
                            type="error"
                            showIcon
                          />
                        ) : null}
                      </Col>

                      <Col span={8}>
                        <Input
                          placeholder="Alias"
                          className="input-form"
                          name="empresa"
                          allowClear
                          value={formik.values.empresa}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.touched.empresa && formik.errors.empresa ? (
                          <Alert
                            message={formik.errors.empresa}
                            type="error"
                            showIcon
                          />
                        ) : null}
                      </Col>
                      <Col span={16}>
                        <Input
                          placeholder="RFC"
                          className="input-form"
                          name="rfc"
                          allowClear
                          value={formik.values.rfc}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                      </Col>
                    </Row>
                  </Form.Item>

                  <Form.Item label="Datos de Contacto">
                    <Row gutter={16}>
                      <Col span={14}>
                        <Input
                          prefix={
                            <MailOutlined
                              style={{ color: "rgba(0,0,0,.25)" }}
                            />
                          }
                          placeholder="Correo electrónico"
                          className="input-form"
                          name="email"
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
                      </Col>
                      <Col span={10}>
                        <Input
                          prefix={
                            <GlobalOutlined
                              style={{ color: "rgba(0,0,0,.25)" }}
                            />
                          }
                          placeholder="Web"
                          className="input-form"
                          name="web"
                          allowClear
                          value={formik.values.web}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                      </Col>
                      <Col span={24}>
                        <Input
                          prefix={
                            <PhoneOutlined
                              style={{ color: "rgba(0,0,0,.25)" }}
                            />
                          }
                          placeholder="Número de teléfono"
                          className="input-form"
                          name="telefono"
                          allowClear
                          value={formik.values.telefono}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                      </Col>
                      <Col span={24}>
                        <Input
                          prefix={
                            <EnvironmentOutlined
                              style={{ color: "rgba(0,0,0,.25)" }}
                            />
                          }
                          placeholder="Dirección"
                          className="input-form"
                          name="direccion"
                          allowClear
                          value={formik.values.direccion}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.touched.direccion && formik.errors.direccion ? (
                          <Alert
                            message={formik.errors.direccion}
                            type="error"
                            showIcon
                          />
                        ) : null}
                      </Col>
                    </Row>
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
                      icon={<UserAddOutlined />}
                    >
                      Registrar cliente
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

export default CustomerCreate;
