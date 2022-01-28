import React, { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useMutation, gql } from "@apollo/client";
import {
  Alert,
  Drawer,
  Button,
  Card,
  Calendar,
  Form,
  Input,
  message,
  notification,
} from "antd";
//import { CalendarOutlined } from "@ant-design/icons";

const layout = {
  labelCol: {
    span: 24,
  },
  wrapperCol: {
    span: 24,
  },
};

const { TextArea } = Input;
const key = "updatable";

const NUEVO_EVENTO = gql`
  mutation nuevoEvento($input: EventoInput) {
    nuevoEvento(input: $input) {
      id
      tipoevento
      nombre
      fecha
      usuario
      creado
    }
  }
`;

const OBTENER_EVENTOS = gql`
  query obtenerEventos {
    obtenerEventos {
      id
      nombre
      fecha
      tipoevento
      usuario
      creado
    }
  }
`;

const UserCalendar = () => {
  const [nuevoEvento] = useMutation(NUEVO_EVENTO, {
    update(cache, { data: { nuevoEvento } }) {
      const { obtenerEventos } = cache.readQuery({
        query: OBTENER_EVENTOS,
      });
      cache.writeQuery({
        query: OBTENER_EVENTOS,
        data: {
          obtenerEventos: [...obtenerEventos, nuevoEvento],
        },
      });
    },
  });

  const formik = useFormik({
    initialValues: {
      tipoevento: "Cobranza",
      nombre: "",
      fecha: "",
    },
    validationSchema: Yup.object({
      tipoevento: Yup.string().required(
        "El tipo de evento no puede ir vacio y es requerido"
      ),
      nombre: Yup.string().required("La descripción del evento es requerida"),
      fecha: Yup.string().required("La fecha es requerida"),
    }),
    onSubmit: async (valores) => {
      const { tipoevento, nombre, fecha } = valores;
      try {
        const { data } = await nuevoEvento({
          variables: {
            input: {
              tipoevento,
              nombre,
              fecha,
            },
          },
        });
        notification.open({
          message: "Registro exitoso",
          description: `${data.nuevoEvento.nombre}, se ha registrado con éxito.`,
          onClick: () => {
            console.log("Notification Clicked!");
          },
        });
        onClose();
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

  const [show, setShow] = useState({
    visible: false,
  });

  // const showDrawer = () => {
  //   setShow({
  //     visible: true,
  //   });
  // };

  const onClose = () => {
    setShow({
      visible: false,
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onPanelChange = (value, mode) => {
    console.log(value, mode);
  };

  const { visible } = show;

  return (
    <Card
      title="Mi Calendario"
      // extra={[
      //   <Button
      //     key={1}
      //     type="primary"
      //     icon={<CalendarOutlined />}
      //     onClick={showDrawer}
      //   >
      //     Crear Evento
      //   </Button>,
      // ]}
    >
      <Calendar onPanelChange={onPanelChange} />
      <Drawer
        title="Crear Evento"
        width={420}
        bodyStyle={{ paddingBottom: 80 }}
        closable={false}
        placement="right"
        onClose={onClose}
        visible={visible}
      >
        <Form
          {...layout}
          onFinish={formik.handleSubmit}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item label="Tipo de evento">
            <Input
              placeholder="Tipo de evento"
              className="input-form"
              name="tipoevento"
              defaultValue={{ value: "Cobranza" }}
              allowClear
              value={formik.values.tipoevento}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.tipoevento && formik.errors.tipoevento ? (
              <Alert message={formik.errors.tipoevento} type="error" showIcon />
            ) : null}
          </Form.Item>
          <Form.Item label="Fecha">
            <Input
              placeholder="Fecha"
              className="input-form"
              name="fecha"
              allowClear
              value={formik.values.fecha}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.fecha && formik.errors.fecha ? (
              <Alert message={formik.errors.fecha} type="error" showIcon />
            ) : null}
          </Form.Item>
          <Form.Item label="Descripción">
            <TextArea
              placeholder="Descripción"
              rows={4}
              //className="input-form"
              name="nombre"
              allowClear
              value={formik.values.nombre}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.nombre && formik.errors.nombre ? (
              <Alert message={formik.errors.nombre} type="error" showIcon />
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
            <Button onClick={onClose} size="large" style={{ marginRight: 8 }}>
              Cancelar
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              size="large"
            >
              Registrar evento
            </Button>
          </div>
        </Form>
      </Drawer>
    </Card>
  );
};

export default UserCalendar;
