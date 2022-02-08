import React from "react";
import * as Yup from "yup";
import SelectForm from "../../components/SelectForm";
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
  Tabs,
  message,
  notification,
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

const { TextArea } = Input;
const { TabPane } = Tabs;

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
      otromotivo
      producto
      categoria
      motivo
      causa
      comentarios
      dictamen
      otrodictamen
    }
  }
`;

const OBTENER_MIS_SOPORTES = gql`
  query obtenerSoportesUsuario {
    obtenerSoportesUsuario {
      id
      nombre
      email
      telefono
      modelo
      ubicacion
      motivollamada
      otromotivo
      producto
      categoria
      motivo
      causa
      comentarios
      dictamen
      otrodictamen
      usuario
    }
  }
`;

const selectReason = [
  { value: "Atencion a clientes", label: "Atencion a clientes" },
  { value: "Soporte", label: "Soporte" },
  { value: "Garantia", label: "Garantia" },
  { value: "Nivel 2", label: "Nivel 2" },
  { value: "Otro", label: "Otro" },
];

const selectProduct = [
  { value: "Car", label: "Car" },
  { value: "Amplificadores", label: "Amplificadores" },
  { value: "Bocinas", label: "Bocinas" },
  { value: "DJ", label: "DJ" },
  { value: "TV", label: "TV" },
  { value: "Headphones", label: "Headphones" },
  { value: "Home", label: "Home" },
  { value: "OEM", label: "OEM" },
];

const selectCategory = [
  { value: "Amplificador", label: "Amplificador" },
  { value: "Audífonos home & DJ", label: "Audífonos home & DJ" },
  { value: "CAR", label: "CAR" },
  { value: "Bocinas", label: "Bocinas" },
  { value: "Dj", label: "Dj" },
];

const selectTypereason = [
  { value: "Asesoría de funcionamiento", label: "Asesoría de funcionamiento" },
  {
    value: "Compra de partes o accesorios",
    label: "Compra de partes o accesorios",
  },
  { value: "Configuración", label: "Configuración" },
  { value: "Error de usuario", label: "Error de usuario" },
  { value: "Falla Wifi", label: "Falla Wifi" },
  { value: "No enciende", label: "No enciende" },
  { value: "Problemas de accesorios", label: "Problemas de accesorios" },
  { value: "Problemas de Hardware", label: "Problemas de Hardware" },
  { value: "Problemas en aplicaciones", label: "Problemas en aplicaciones" },
  { value: "Problemas en audio", label: "Problemas en audio" },
  { value: "Problemas en display", label: "Problemas en display" },
  { value: "Otro", label: "Otro" },
];

const selectCause = [
  { value: "Asesoría de funcionamiento", label: "Asesoría de funcionamiento" },
  { value: "No se conecta al programa", label: "No se conecta al programa" },
  {
    value: "No puede descargar Firmware",
    label: "No puede descargar Firmware",
  },
  { value: "Actualizaciones firmware", label: "Actualizaciones firmware" },
  {
    value: "Compra de partes o accesorios",
    label: "Compra de partes o accesorios",
  },
  { value: "No conecta Bluetooth", label: "No conecta Bluetooth" },
  { value: "No hay audio", label: "No hay audio" },
  {
    value: "No hay audio en los audífonos",
    label: "No hay audio en los audífonos",
  },
  { value: "Protegido", label: "Protegido" },
  { value: "Olor a quemado", label: "Olor a quemado" },
  { value: "Distorsiona", label: "Distorsiona" },
  { value: "Se sobrecalienta", label: "Se sobrecalienta" },
  { value: "Diadema dañada o rota", label: "Diadema dañada o rota" },
  { value: "Cono roto o despegado", label: "Cono roto o despegado" },
  { value: "No se escucha", label: "No se escucha" },
  { value: "Olor a quemado", label: "Olor a quemado" },
  { value: "Equipo dañado", label: "Equipo dañado" },
  { value: "Faltan accesorios", label: "Faltan accesorios" },
  {
    value: "Equipo Dañado o roto al sacarlo del empaque",
    label: "Equipo Dañado o roto al sacarlo del empaque",
  },
  { value: "No se conecta a Wifi", label: "No se conecta a Wifi" },
  { value: "Se apago pero tiene audio", label: "Se apago pero tiene audio" },
  {
    value: "Se apago pero ya no encendió",
    label: "Se apago pero ya no encendió",
  },
  {
    value: "No funciona el control remoto",
    label: "No funciona el control remoto",
  },
  { value: "No enciende", label: "No enciende" },
  { value: "No se escucha", label: "No se escucha" },
  { value: "Sin audio", label: "Sin audio" },
  { value: "Se apaga", label: "Se apaga" },
  { value: "No enciende", label: "No enciende" },
  { value: "Falla Bluetooth", label: "Falla Bluetooth" },
  { value: "Solo se escucha un canal", label: "Solo se escucha un canal" },
  { value: "No carga la batería", label: "No carga la batería" },
  { value: "Audio intermitente", label: "Audio intermitente" },
  { value: "Sin audio", label: "Sin audio" },
  { value: "Audio distorsionado", label: "Audio distorsionado" },
  { value: "No enciendeNo enciende", label: "" },
  { value: "Aparece AMP-ERROR", label: "Aparece AMP-ERROR" },
  { value: "No funciona Bluetooth", label: "No funciona Bluetooth" },
  {
    value: "Sin salida de señal de audio en RCA",
    label: "Sin salida de señal de audio en RCA",
  },
  { value: "No funciona Touch", label: "No funciona Touch" },
  { value: "No Funciona USB", label: "No Funciona USB" },
  { value: "Se sobrecalienta", label: "Se sobrecalienta" },
  { value: "No enciende", label: "No enciende" },
  { value: "Distorsión de audio", label: "Distorsión de audio" },
  { value: "Se bloquea", label: "Se bloquea" },
  { value: "No funciona MIC", label: "No funciona MIC" },
  { value: "No funcionan botones", label: "No funcionan botones" },
  { value: "No enciende foco", label: "No enciende foco" },
  {
    value: "No responde correctamente a comandos",
    label: "No responde correctamente a comandos",
  },
  {
    value: "Falla aplicación Pioneer Smart Sync",
    label: "Falla aplicación Pioneer Smart Sync",
  },
  {
    value: "No Funciona con Android auto",
    label: "No Funciona con Android auto",
  },
  { value: "No funciona con CarPlay", label: "No funciona con CarPlay" },
  {
    value: "No se conecta o funciona con aplicaciones instaladas",
    label: "No se conecta o funciona con aplicaciones instaladas",
  },
  {
    value: "No se pueden instalar aplicaciones",
    label: "No se pueden instalar aplicaciones",
  },
  { value: "Audio intermitente", label: "Audio intermitente" },
  { value: "Se corta el audio", label: "Se corta el audio" },
  { value: "No tiene audio", label: "No tiene audio" },
  { value: "Audio intermitente", label: "Audio intermitente" },
  { value: "Audio distorsionado", label: "Audio distorsionado" },
  { value: "Distorsiona o cartonea", label: "Distorsiona o cartonea" },
  { value: "No tiene audio", label: "No tiene audio" },
  { value: "Aparecieron rayas", label: "Aparecieron rayas" },
  { value: "Apareció mancha o manchas", label: "Apareció mancha o manchas" },
  { value: "Se ve la mitad de imagen", label: "Se ve la mitad de imagen" },
];

const selectDictation = [
  { value: "Contestada Satisfecho", label: "Contestada Satisfecho" },
  { value: "Contestada Insatisfecho", label: "Contestada Insatisfecho" },
  { value: "Se corta llamada", label: "Se corta llamada" },
  { value: "Cuelga llamada", label: "Cuelga llamada" },
  { value: "Canalizada a nivel 2", label: "Canalizada a nivel 2" },
  { value: "Canalizada a CSA", label: "Canalizada a CSA" },
  { value: "Canalizada a DIS", label: "Canalizada a DIS" },
  { value: "Problema resuelto", label: "Problema resuelto" },
  { value: "Otro", label: "Otro" },
];

const SupportCreate = () => {
  const [nuevoSoporte] = useMutation(NUEVO_SOPORTE, {
    update(cache, { data: { nuevoSoporte } }) {
      // obtener cache
      const { obtenerSoportesUsuario } = cache.readQuery({
        query: OBTENER_MIS_SOPORTES,
      });
      // reescribimos cache no es mutable
      cache.writeQuery({
        query: OBTENER_MIS_SOPORTES,
        DATA: {
          obtenerSoportesUsuario: [...obtenerSoportesUsuario, nuevoSoporte],
        },
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
      otromotivo: "",
      producto: "",
      categoria: "",
      motivo: "",
      causa: "",
      comentarios: "",
      dictamen: "",
      otrodictamen: "",
    },
    validationSchema: Yup.object({
      nombre: Yup.string().required("El Nombre es obligatorio."),
      email: Yup.string()
        .email("El email no es válido")
        .required("El email es obligatorio"),
      telefono: Yup.string().required("El teléfono es obligatorio."),
      modelo: Yup.string().required("El Modelo es obligatorio."),
      ubicacion: Yup.string().required("La Ubicación es obligatoria."),
      motivollamada: Yup.string().required(
        "El Motivo de la llamada es obligatorio."
      ),
      otromotivo: Yup.string(),
      producto: Yup.string().required("El Producto es obligatorio."),
      categoria: Yup.string().required("La Categoría es obligatoria."),
      motivo: Yup.string().required("El Motivo es obligatorio."),
      causa: Yup.string().required("la Causa es obligatoria."),
      comentarios: Yup.string().required("Los Comentarios son obligatorios."),
      dictamen: Yup.string().required("El Dictamen es obligatorio."),
      otrodictamen: Yup.string(),
    }),
    onSubmit: async (valores) => {
      const {
        nombre,
        email,
        telefono,
        modelo,
        ubicacion,
        motivollamada,
        otromotivo,
        producto,
        categoria,
        motivo,
        causa,
        comentarios,
        dictamen,
        otrodictamen,
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
              otromotivo,
              producto,
              categoria,
              motivo,
              causa,
              comentarios,
              dictamen,
              otrodictamen,
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
          <Tabs tabPosition="left">
            <TabPane tab="1" key="1">
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
                      <Alert
                        message={formik.errors.nombre}
                        type="error"
                        showIcon
                      />
                    ) : null}
                  </Col>
                  <Col span={8}>
                    <Input
                      prefix={
                        <MailOutlined style={{ color: "rgba(0,0,0,.25)" }} />
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
                      <Alert
                        message={formik.errors.modelo}
                        type="error"
                        showIcon
                      />
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
            </TabPane>
            <TabPane tab="2" key="2">
              <Form.Item label="Datos de la Llamada">
                <Row gutter={24}>
                  <Col span={12}>
                    <SelectForm
                      placeholder="Motivo de la llamada"
                      className="input-form"
                      options={selectReason}
                      isClearable
                      value={formik.values.motivollamada}
                      onChange={(value) =>
                        formik.setFieldValue("motivollamada", value.value)
                      }
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.motivollamada &&
                    formik.errors.motivollamada ? (
                      <Alert
                        message={formik.errors.motivollamada}
                        type="error"
                        showIcon
                      />
                    ) : null}
                  </Col>
                  {formik.values.motivollamada === "Otro" ? (
                    <Col span={6}>
                      <Input
                        placeholder="Otro"
                        className="input-form"
                        name="otromotivo"
                        allowClear
                        value={formik.values.otromotivo}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                    </Col>
                  ) : (
                    <Col span={6}>
                      <Input
                        placeholder="Otro"
                        className="input-form"
                        name="otromotivo"
                        disabled
                      />
                    </Col>
                  )}
                  <Col span={6}>
                    <SelectForm
                      placeholder="Producto"
                      className="input-form"
                      options={selectProduct}
                      isClearable
                      value={formik.values.producto}
                      onChange={(value) =>
                        formik.setFieldValue("producto", value.value)
                      }
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
                    <SelectForm
                      placeholder="Categoría"
                      className="input-form"
                      options={selectCategory}
                      isClearable
                      value={formik.values.categoria}
                      onChange={(value) =>
                        formik.setFieldValue("categoria", value.value)
                      }
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
                    <SelectForm
                      placeholder="Motivo"
                      className="input-form"
                      options={selectTypereason}
                      isClearable
                      value={formik.values.motivo}
                      onChange={(value) =>
                        formik.setFieldValue("motivo", value.value)
                      }
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.motivo && formik.errors.motivo ? (
                      <Alert
                        message={formik.errors.motivo}
                        type="error"
                        showIcon
                      />
                    ) : null}
                  </Col>
                  <Col span={8}>
                    <SelectForm
                      placeholder="Causa"
                      className="input-form"
                      options={selectCause}
                      isClearable
                      value={formik.values.causa}
                      onChange={(value) =>
                        formik.setFieldValue("causa", value.value)
                      }
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.causa && formik.errors.causa ? (
                      <Alert
                        message={formik.errors.causa}
                        type="error"
                        showIcon
                      />
                    ) : null}
                  </Col>
                  <Col span={12}>
                    <SelectForm
                      placeholder="Dictamen llamada"
                      className="input-form"
                      options={selectDictation}
                      isClearable
                      value={formik.values.dictamen}
                      onChange={(value) =>
                        formik.setFieldValue("dictamen", value.value)
                      }
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
                  {formik.values.dictamen === "Otro" ? (
                    <Col span={12}>
                      <Input
                        placeholder="Otro"
                        className="input-form"
                        name="otrodictamen"
                        allowClear
                        value={formik.values.otrodictamen}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                    </Col>
                  ) : (
                    <Col span={12}>
                      <Input
                        placeholder="Otro"
                        className="input-form"
                        name="otrodictamen"
                        disabled
                      />
                    </Col>
                  )}

                  <Col span={24}>
                    <TextArea
                      placeholder="Comentarios"
                      className="input-form"
                      name="comentarios"
                      autoSize={{ minRows: 3, maxRows: 5 }}
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
                  icon={<PlusCircleOutlined />}
                >
                  Registrar ticket
                </Button>
              </div>
            </TabPane>
          </Tabs>
        </Card>
      </Form>
    </div>
  );
};

export default SupportCreate;
