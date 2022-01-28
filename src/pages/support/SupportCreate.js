import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useMutation, gql } from "@apollo/client";
import { useHistory } from "react-router-dom";
import {
  PageHeader,
  Alert,
  Row,
  Col,
  Card,
  Button,
  Form,
  Input,
  message,
  notification,
  Select,
} from "antd";
import { PlusCircleOutlined, MailOutlined } from "@ant-design/icons";

const layout = {
  labelCol: {
    span: 24,
  },
  wrapperCol: {
    span: 24,
  },
};

const { Option } = Select;

const key = "updatable";

const NUEVO_SOPORTE = gql`
  mutation NuevoSoporte($input: SoporteInput) {
    nuevoSoporte(input: $input) {
      nombre
      email
      telefono
      modelo
      ubicacion
      motivollamada
      otro
      producto
      categoria
      motivo
      causa
      comentarios
      dictamen
    }
  }
`;

const OBTENER_SOPORTES = gql`
  query obtenerSoportes {
    obtenerSoportes {
      id
      nombre
      email
      telefono
      modelo
      ubicacion
      motivollamada
      otro
      producto
      categoria
      motivo
      causa
      comentarios
      dictamen
    }
  }
`;

const SupportCreate = () => {
  const [nuevoSoporte] = useMutation(NUEVO_SOPORTE, {
    update(cache, { data: { nuevoSoporte } }) {
      // obtener cache
      const { obtenerSoportes } = cache.readQuery({ query: OBTENER_SOPORTES });
      // reescribimos cache no es mutable
      cache.writeQuery({
        query: OBTENER_SOPORTES,
        DATA: { obtenerSoportes: [...obtenerSoportes, nuevoSoporte] },
      });
    },
  });

  const formik = useFormik({
    initialValues: {
      nombre: "",
      email: "",
      telefono: "",
      modelo: "",
      ubicacion: "",
      motivollamada: "",
      otro: "",
      producto: "",
      categoria: "",
      motivo: "",
      causa: "",
      comentarios: "",
      dictamen: "",
    },
    validationSchema: Yup.object({
      nombre: Yup.string().required(
        "El Nombre es obligatorio y no puede ir vacio."
      ),
      email: Yup.string()
        .email("El email no es válido")
        .required("El email es obligatorio"),
      telefono: Yup.string().required(
        "El teléfono es obligatorio y no puede ir vacio."
      ),
      modelo: Yup.string().required(
        "El Modelo es obligatorio y no puede ir vacio."
      ),
      ubicacion: Yup.string().required(
        "La Ubicación es obligatoria y no puede ir vacia."
      ),
      motivollamada: Yup.string().required(
        "El Motivo de la llamada es obligatorio y no puede ir vacio."
      ),
      otro: Yup.string(),
      producto: Yup.string().required(
        "El Producto es obligatorio y no puede ir vacio."
      ),
      categoria: Yup.string().required(
        "La Categoría es obligatoria y no puede ir vacia."
      ),
      motivo: Yup.string().required(
        "El Motivo es obligatorio y no puede ir vacio."
      ),
      causa: Yup.string().required(
        "la Causa es obligatoria y no puede ir vacia."
      ),
      comentarios: Yup.string().required(
        "Los Comentarios son obligatorios y no pueden ir vacios."
      ),
      dictamen: Yup.string().required(
        "El Dictamen es obligatorio y no puede ir vacio."
      ),
    }),
    onSubmit: async (valores) => {
      const {
        nombre,
        email,
        telefono,
        modelo,
        ubicacion,
        motivollamada,
        otro,
        producto,
        categoria,
        motivo,
        causa,
        comentarios,
        dictamen,
      } = valores;
      try {
        const { data } = await nuevoSoporte({
          variables: {
            input: {
              nombre,
              email,
              telefono,
              modelo,
              ubicacion,
              motivollamada,
              otro,
              producto,
              categoria,
              motivo,
              causa,
              comentarios,
              dictamen,
            },
          },
        });
        notification.open({
          message: "Registro exitoso",
          description: `${data.nuevoSoporte.dictamen}, se ha registrado con éxito.`,
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
        title="Soporte"
        subTitle="Alta"
        onBack={goBack}
      />
      <Form
        {...layout}
        onFinish={formik.handleSubmit}
        onFinishFailed={onFinishFailed}
      >
        <Card>
          <Form.Item label="Datos del Contacto">
            <Row gutter={24}>
              <Col span={16}>
                <Input
                  placeholder="Nombre"
                  className="input-form"
                  name="nombre"
                  allowClear
                  value={formik.values.nombre}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.nombre && formik.errors.nombre ? (
                  <Alert message={formik.errors.nombre} type="error" showIcon />
                ) : null}
              </Col>
              <Col span={8}>
                <Input
                  prefix={<MailOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                  placeholder="Correo electrónico"
                  className="input-form"
                  name="email"
                  allowClear
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email ? (
                  <Alert message={formik.errors.email} type="error" showIcon />
                ) : null}
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={8}>
                <Input
                  placeholder="Teléfono"
                  className="input-form"
                  name="telefono"
                  allowClear
                  value={formik.values.telefono}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.telefono && formik.errors.telefono ? (
                  <Alert
                    message={formik.errors.telefono}
                    type="error"
                    showIcon
                  />
                ) : null}
              </Col>
              <Col span={8}>
                <Input
                  placeholder="Modelo"
                  className="input-form"
                  name="modelo"
                  allowClear
                  value={formik.values.modelo}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.modelo && formik.errors.modelo ? (
                  <Alert message={formik.errors.modelo} type="error" showIcon />
                ) : null}
              </Col>
              <Col span={8}>
                <Input
                  placeholder="Ubicación"
                  className="input-form"
                  name="ubicacion"
                  allowClear
                  value={formik.values.ubicacion}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.ubicacion && formik.errors.ubicacion ? (
                  <Alert
                    message={formik.errors.ubicacion}
                    type="error"
                    showIcon
                  />
                ) : null}
              </Col>
            </Row>
          </Form.Item>

          <Form.Item label="Datos de la Llamada">
            <Row gutter={24}>
              <Col span={12}>
                <Input
                  placeholder="Motivo de la llamada"
                  className="input-form"
                  name="motivollamada"
                  allowClear
                  value={formik.values.motivollamada}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.motivollamada && formik.errors.motivollamada ? (
                  <Alert
                    message={formik.errors.motivollamada}
                    type="error"
                    showIcon
                  />
                ) : null}
              </Col>
              <Col span={4}>
                <Input
                  placeholder="Producto"
                  className="input-form"
                  name="producto"
                  allowClear
                  value={formik.values.producto}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.producto && formik.errors.producto ? (
                  <Alert
                    message={formik.errors.producto}
                    type="error"
                    showIcon
                  />
                ) : null}
              </Col>
              <Col span={8}>
                <Input
                  placeholder="Categoría"
                  className="input-form"
                  name="categoria"
                  allowClear
                  value={formik.values.categoria}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.categoria && formik.errors.categoria ? (
                  <Alert
                    message={formik.errors.categoria}
                    type="error"
                    showIcon
                  />
                ) : null}
              </Col>
              <Col span={8}>
                <Input
                  placeholder="Motivo"
                  className="input-form"
                  name="motivo"
                  allowClear
                  value={formik.values.motivo}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.motivo && formik.errors.motivo ? (
                  <Alert message={formik.errors.motivo} type="error" showIcon />
                ) : null}
              </Col>
              <Col span={8}>
                <Input
                  placeholder="Causa"
                  className="input-form"
                  name="causa"
                  allowClear
                  value={formik.values.causa}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.causa && formik.errors.causa ? (
                  <Alert message={formik.errors.causa} type="error" showIcon />
                ) : null}
              </Col>
              <Col span={8}>
                <Input
                  placeholder="Dictamen llamada"
                  className="input-form"
                  name="dictamen"
                  allowClear
                  value={formik.values.dictamen}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.dictamen && formik.errors.dictamen ? (
                  <Alert
                    message={formik.errors.dictamen}
                    type="error"
                    showIcon
                  />
                ) : null}
              </Col>
              <Col span={24}>
                <Input
                  placeholder="Comentarios"
                  className="input-form"
                  name="comentarios"
                  allowClear
                  value={formik.values.comentarios}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.comentarios && formik.errors.comentarios ? (
                  <Alert
                    message={formik.errors.comentarios}
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
            <Button onClick={goBack} size="large" style={{ marginRight: 8 }}>
              Cancelar
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              size="large"
              icon={<PlusCircleOutlined />}
            >
              Registrar ticket
            </Button>
          </div>
        </Card>
      </Form>
    </div>
  );
};

export default SupportCreate;
