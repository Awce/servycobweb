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
  message,
  notification,
  TimePicker,
  DatePicker,
} from "antd";
import { PlusCircleOutlined, MailOutlined } from "@ant-design/icons";
import moment from "moment";

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
      usuario
      dictamen
      otrodictamen
    }
  }
`;

const selectReason = [
  { value: "Atencion a clientes", label: "Atencion a clientes" },
  { value: "Soporte", label: "Soporte" },
  { value: "Garantia", label: "Garantia" },
  { value: "Nivel 2", label: "Nivel 2" },
  { value: "Ventas", label: "Ventas" },
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
  { value: "Ventas", label: "Ventas" },
  { value: "No proporciona", label: "No proporciona" },
];

const selectCategory = [
  { value: "Amplificador", label: "Amplificador" },
  { value: "Audífonos home & DJ", label: "Audífonos home & DJ" },
  { value: "CAR", label: "CAR" },
  { value: "Bocinas", label: "Bocinas" },
  { value: "Dj", label: "Dj" },
  { value: "TV", label: "TV" },
  { value: "Ventas", label: "Ventas" },
  { value: "No proporciona", label: "No proporciona" },
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
  { value: "Actualizacion de firmware", label: "Actualizacion de firmware" },
  { value: "Pago de reembolso atrasado", label: "Pago de reembolso atrasado" },
  {
    value: "Procedimiento para validar garantia",
    label: "Procedimiento para validar garantia",
  },
  {
    value: "Inf. Donde comprar un equipo",
    label: "Inf. Donde comprar un equipo",
  },
  {
    value: "Queja del centro de servicio",
    label: "Queja del centro de servicio",
  },
  { value: "Seguimiento a garantía", label: "Seguimiento a garantía" },
  {
    value: "Ubicacion de centro de servicio",
    label: "Ubicacion de centro de servicio",
  },
  { value: "No Proporciona", label: "No Proporciona" },
  { value: "Otro", label: "Otro" },
];

const selectCauseadvisory = [
  { value: "Asesoría de funcionamiento", label: "Asesoría de funcionamiento" },
  { value: "No se conecta al programa", label: "No se conecta al programa" },
];

const selectCausePurchase = [
  {
    value: "Compra de partes o accesorios",
    label: "Compra de partes o accesorios",
  },
];

const selectCauseSetting = [
  { value: "No conecta Bluetooth", label: "No conecta Bluetooth" },
  { value: "No hay audio", label: "No hay audio" },
  {
    value: "No hay audio en los audífonos",
    label: "No hay audio en los audífonos",
  },
];

const selectCauseError = [
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
];

const selectCuaseFail = [
  { value: "No se conecta a Wifi", label: "No se conecta a Wifi" },
];

const selectCuaseTurn = [
  { value: "Se apago pero tiene audio", label: "Se apago pero tiene audio" },
  {
    value: "Se apago pero ya no encendió",
    label: "Se apago pero ya no encendió",
  },
];

const selectCauseProblem = [
  {
    value: "No funciona el control remoto",
    label: "No funciona el control remoto",
  },
];

const selectCuaseProblemHard = [
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
];

const selectCuaseProblemApp = [
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
];

const selectCauseProblemAudio = [
  { value: "Audio intermitente", label: "Audio intermitente" },
  { value: "Se corta el audio", label: "Se corta el audio" },
  { value: "No tiene audio", label: "No tiene audio" },
  { value: "Audio intermitente", label: "Audio intermitente" },
  { value: "Audio distorsionado", label: "Audio distorsionado" },
  { value: "Distorsiona o cartonea", label: "Distorsiona o cartonea" },
  { value: "No tiene audio", label: "No tiene audio" },
];

const selectCauseProblemDisplay = [
  { value: "Aparecieron rayas", label: "Aparecieron rayas" },
  { value: "Apareció mancha o manchas", label: "Apareció mancha o manchas" },
  { value: "Se ve la mitad de imagen", label: "Se ve la mitad de imagen" },
];

const selectCauseFirmware = [
  {
    value: "No puede descargar Firmware",
    label: "No puede descargar Firmware",
  },
  { value: "Actualizaciones firmware", label: "Actualizaciones firmware" },
];

const selectCausePay = [
  {
    value: "Pago de reembolso atrasado",
    label: "Pago de reembolso atrasado",
  },
];

const selectCauseProcess = [
  {
    value: "Procedimiento para validar garantia",
    label: "Procedimiento para validar garantia",
  },
];

const selectCauseInfo = [
  {
    value: "Inf. Donde comprar un equipo",
    label: "Inf. Donde comprar un equipo",
  },
];

const selectCauseComplaints = [
  {
    value: "Queja del centro de servicio",
    label: "Queja del centro de servicio",
  },
];

const selectCauseFollow = [
  {
    value: "Seguimiento a garantía",
    label: "Seguimiento a garantía",
  },
];

const selectCauseLocation = [
  {
    value: "Ubicacion de centro de servicio",
    label: "Ubicacion de centro de servicio",
  },
];

const selectCauseProvider = [
  {
    value: "No Proporciona",
    label: "No Proporciona",
  },
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

  const onChangeTime = (time, timeString) => {
    console.log(time, timeString);
  };

  const onChangeDate = (date, dateString) => {
    console.log(date, dateString);
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
                {formik.touched.motivollamada && formik.errors.motivollamada ? (
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
                  <Alert message={formik.errors.motivo} type="error" showIcon />
                ) : null}
              </Col>

              {formik.values.motivo === "Asesoría de funcionamiento" ? (
                <Col span={8}>
                  <SelectForm
                    placeholder="Causa"
                    className="input-form"
                    options={selectCauseadvisory}
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
              ) : null}

              {formik.values.motivo === "Compra de partes o accesorios" ? (
                <Col span={8}>
                  <SelectForm
                    placeholder="Causa"
                    className="input-form"
                    options={selectCausePurchase}
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
              ) : null}

              {formik.values.motivo === "Configuración" ? (
                <Col span={8}>
                  <SelectForm
                    placeholder="Causa"
                    className="input-form"
                    options={selectCauseSetting}
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
              ) : null}

              {formik.values.motivo === "Error de usuario" ? (
                <Col span={8}>
                  <SelectForm
                    placeholder="Causa"
                    className="input-form"
                    options={selectCauseError}
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
              ) : null}

              {formik.values.motivo === "Falla Wifi" ? (
                <Col span={8}>
                  <SelectForm
                    placeholder="Causa"
                    className="input-form"
                    options={selectCuaseFail}
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
              ) : null}

              {formik.values.motivo === "No enciende" ? (
                <Col span={8}>
                  <SelectForm
                    placeholder="Causa"
                    className="input-form"
                    options={selectCuaseTurn}
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
              ) : null}

              {formik.values.motivo === "Problemas de accesorios" ? (
                <Col span={8}>
                  <SelectForm
                    placeholder="Causa"
                    className="input-form"
                    options={selectCauseProblem}
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
              ) : null}

              {formik.values.motivo === "Problemas de Hardware" ? (
                <Col span={8}>
                  <SelectForm
                    placeholder="Causa"
                    className="input-form"
                    options={selectCuaseProblemHard}
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
              ) : null}

              {formik.values.motivo === "Problemas en aplicaciones" ? (
                <Col span={8}>
                  <SelectForm
                    placeholder="Causa"
                    className="input-form"
                    options={selectCuaseProblemApp}
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
              ) : null}

              {formik.values.motivo === "Problemas en audio" ? (
                <Col span={8}>
                  <SelectForm
                    placeholder="Causa"
                    className="input-form"
                    options={selectCauseProblemAudio}
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
              ) : null}

              {formik.values.motivo === "Problemas en display" ? (
                <Col span={8}>
                  <SelectForm
                    placeholder="Causa"
                    className="input-form"
                    options={selectCauseProblemDisplay}
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
              ) : null}

              {formik.values.motivo === "Actualizacion de firmware" ? (
                <Col span={8}>
                  <SelectForm
                    placeholder="Causa"
                    className="input-form"
                    options={selectCauseFirmware}
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
              ) : null}

              {formik.values.motivo === "Pago de reembolso atrasado" ? (
                <Col span={8}>
                  <SelectForm
                    placeholder="Causa"
                    className="input-form"
                    options={selectCausePay}
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
              ) : null}

              {formik.values.motivo === "Pago de reembolso atrasado" ? (
                <Col span={8}>
                  <SelectForm
                    placeholder="Causa"
                    className="input-form"
                    options={selectCausePay}
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
              ) : null}

              {formik.values.motivo ===
              "Procedimiento para validar garantia" ? (
                <Col span={8}>
                  <SelectForm
                    placeholder="Causa"
                    className="input-form"
                    options={selectCauseProcess}
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
              ) : null}

              {formik.values.motivo === "Inf. Donde comprar un equipo" ? (
                <Col span={8}>
                  <SelectForm
                    placeholder="Causa"
                    className="input-form"
                    options={selectCauseInfo}
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
              ) : null}

              {formik.values.motivo === "Queja del centro de servicio" ? (
                <Col span={8}>
                  <SelectForm
                    placeholder="Causa"
                    className="input-form"
                    options={selectCauseComplaints}
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
              ) : null}

              {formik.values.motivo === "Seguimiento a garantía" ? (
                <Col span={8}>
                  <SelectForm
                    placeholder="Causa"
                    className="input-form"
                    options={selectCauseFollow}
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
              ) : null}

              {formik.values.motivo === "Ubicacion de centro de servicio" ? (
                <Col span={8}>
                  <SelectForm
                    placeholder="Causa"
                    className="input-form"
                    options={selectCauseLocation}
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
              ) : null}

              {formik.values.motivo === "No Proporciona" ? (
                <Col span={8}>
                  <SelectForm
                    placeholder="Causa"
                    className="input-form"
                    options={selectCauseProvider}
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
              ) : null}

              {formik.values.motivo === "Otro" ? (
                <Col span={8}>
                  <Input
                    placeholder="Otro"
                    className="input-form"
                    name="causa"
                    allowClear
                    value={formik.values.causa}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </Col>
              ) : null}

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
