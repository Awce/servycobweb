import React, { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useMutation, gql } from "@apollo/client";
import { useHistory } from "react-router-dom";
import {
  Alert,
  Drawer,
  Button,
  Cascader,
  Form,
  Input,
  Col,
  Row,
  message,
  notification,
} from "antd";
import { FileAddOutlined } from "@ant-design/icons";

const layout = {
  labelCol: {
    span: 24,
  },
  wrapperCol: {
    span: 24,
  },
};

const { TextArea } = Input;
const InputGroup = Input.Group;
const key = "updatable";

export const DictationsOptions = [
  {
    value: "Telefonico",
    label: "Telefonico",
    children: [
      {
        value: "Contacto Directo",
        label: "Contacto Directo",
        children: [
          {
            value: "Negativa de Pago",
            label: "Negativa de Pago",
            code: 2,
          },
          {
            value: "Cobrada por GDC o Consejera",
            label: "Cobrada por GDC o Consejera",
            code: 3,
          },
          {
            value: "Doble Nombramiento o Saldo",
            label: "Doble Nombramiento o Saldo",
            code: 5,
          },
          {
            value: "Reclamación de Premio",
            label: "Reclamación de Premio",
            code: 6,
          },
          {
            value: "Promesa de Pago",
            label: "Promesa de Pago",
            code: 7,
          },
          {
            value: "Caja Devuelta a GDV",
            label: "Caja Devuelta a GDV",
            code: 8,
          },
          {
            value: "Pago a Porteador",
            label: "Pago a Porteador",
            code: 9,
          },
          {
            value: "Producto devuelto a GDC",
            label: "Producto devuelto a GDC",
            code: 10,
          },
          {
            value: "Contratación Menor de Edad",
            label: "Contratación Menor de Edad",
            code: 11,
          },
          {
            value: "Pedido NO Entregado",
            label: "Pedido NO Entregado",
            code: 12,
          },
          {
            value: "Ajuste Pendiente",
            label: "Ajuste Pendiente",
            code: 13,
          },
          {
            value: "Pedido NO solicitado por Dama",
            label: "Pedido NO solicitado por Dama",
            code: 14,
          },
          {
            value: "Dama NO Recibio Producto",
            label: "Dama NO Recibio Producto",
            code: 15,
          },
          {
            value: "Pago a Cobrador",
            label: "Pago a Cobrador",
            code: 23,
          },
          {
            value: "Pedidos Multiples",
            label: "Pedidos Multiples",
            code: 26,
          },
          {
            value: "Ya pago",
            label: "Ya pago",
            code: 34,
          },
          {
            value: "Promesa Incumplida",
            label: "Promesa Incumplida",
            code: 35,
          },
          {
            value: "Seguimiento a Promesa de Pago",
            label: "Seguimiento a Promesa de Pago",
            code: 36,
          },
          {
            value: "Negociando",
            label: "Negociando",
            code: 37,
          },
        ],
      },
      {
        value: "Contacto Indirecto",
        label: "Contacto Indirecto",
        children: [
          {
            value: "Se Notifica del saldo a Terceros",
            label: "Se Notifica del saldo a Terceros",
            code: 20,
          },
          {
            value: "Defuncion Dama",
            label: "Defuncion Dama",
            code: 24,
          },
          {
            value: "Domicilio-Tel. de GDC o concejera",
            label: "Domicilio-Tel. de GDC o concejera",
            code: 25,
          },
          {
            value: "Cuelgan llamada",
            label: "Cuelgan llamada",
            code: 27,
          },
        ],
      },
      {
        value: "Sin Contacto",
        label: "Sin Contacto",
        children: [
          {
            value: "Pedidos Multiples",
            label: "Pedidos Multiples",
            code: 26,
          },
          {
            value: "No contestan",
            label: "No contestan",
            code: 28,
          },
          {
            value: "Fuera de servicio",
            label: "Fuera de servicio",
            code: 29,
          },
          {
            value: "Ocupado",
            label: "Ocupado",
            code: 31,
          },
        ],
      },
      {
        value: "Ilocalizable",
        label: "Ilocalizable",
        children: [
          {
            value: "Cambio de Domicilio",
            label: "Cambio de Domicilio",
            code: 1,
          },
          {
            value: "No conocen a Consejera, No Vive ahí",
            label: "No conocen a Consejera, No Vive ahí",
            code: 22,
          },
          {
            value: "No existe",
            label: "No existe",
            code: 32,
          },
          {
            value: "Sin Datos Telefonicos",
            label: "Sin Datos Telefonicos",
            code: 34,
          },
          {
            value: "Telefono incompleto",
            label: "Telefono incompleto",
            code: 35,
          },
        ],
      },
    ],
  },
  {
    value: "Domiciliar",
    label: "Domiciliar",
    children: [
      {
        value: "Domiciliar",
        label: "Domiciliar",
        children: [
          {
            value: "Nueva-Inactividad",
            label: "Nueva-Inactividad",
            code: 0,
          },
          {
            value: "Cambio de Domicilio",
            label: "Cambio de Domicilio",
            code: 1,
          },
          {
            value: "Negativa de Pago",
            label: "Negativa de Pago",
            code: 2,
          },
          {
            value: "Cobrada por GDC o Consejera",
            label: "Cobrada por GDC o Consejera",
            code: 3,
          },
          {
            value: "Domicilio no Localizado",
            label: "Domicilio no Localizado",
            code: 4,
          },
          {
            value: "Doble Nombramiento o Saldo",
            label: "Doble Nombramiento o Saldo",
            code: 5,
          },
          {
            value: "Reclamación de Premio",
            label: "Reclamación de Premio",
            code: 6,
          },
          {
            value: "Promesa de Pago",
            label: "Promesa de Pago",
            code: 7,
          },
          {
            value: "Caja Devuelta a GDV",
            label: "Caja Devuelta a GDV",
            code: 8,
          },
          {
            value: "Pago a Porteador",
            label: "Pago a Porteador",
            code: 9,
          },
          {
            value: "Producto devuelto a GDC",
            label: "Producto devuelto a GDC",
            code: 10,
          },
          {
            value: "Contratación Menor de Edad",
            label: "Contratación Menor de Edad",
            code: 11,
          },
          {
            value: "Pedido NO Entregado",
            label: "Pedido NO Entregado",
            code: 12,
          },
          {
            value: "Pedido NO solicitado por Dama",
            label: "Pedido NO solicitado por Dama",
            code: 14,
          },
          {
            value: "Dama NO Recibio Producto",
            label: "Dama NO Recibio Producto",
            code: 15,
          },
          {
            value: "Pdcto. A dev x Dama, pend. X rec.",
            label: "Pdcto. A dev x Dama, pend. X rec.",
            code: 16,
          },
          {
            value: "Dama fuera de zona",
            label: "Dama fuera de zona",
            code: 18,
          },
          {
            value: "Dama NO Gestionada - Visitada",
            label: "Dama NO Gestionada - Visitada",
            code: 19,
          },
          {
            value: "Se Notifica del saldo a Terceros",
            label: "Se Notifica del saldo a Terceros",
            code: 20,
          },
          {
            value: "Casa Vacía o Lote Baldío",
            label: "Casa Vacía o Lote Baldío",
            code: 21,
          },
          {
            value: "No conocen a Consejera, No Vive ahí",
            label: "No conocen a Consejera, No Vive ahí",
            code: 22,
          },
          {
            value: "Pago a Cobrador",
            label: "Pago a Cobrador",
            code: 23,
          },
          {
            value: "Defuncion Dama",
            label: "Defuncion Dama",
            code: 24,
          },
          {
            value: "Domicilio-Tel. de GDC o concejera",
            label: "Domicilio-Tel. de GDC o concejera",
            code: 25,
          },
          {
            value: "Pedidos Multiples",
            label: "Pedidos Multiples",
            code: 26,
          },
        ],
      },
    ],
  },
];

const NUEVO_DICTAMEN = gql`
  mutation nuevoDictamen($input: DictamenInput) {
    nuevoDictamen(input: $input) {
      numdama
      digitodama
      dictamen
      subdictamen
      razon
      folio
      monto
      fechapago
      comentarios
      gestor
    }
  }
`;

const OBTENER_DICTAMENES = gql`
  query obtenerDictamenes {
    obtenerDictamenes {
      id
      numdama
      digitodama
      dictamen
      subdictamen
      razon
      folio
      monto
      fechapago
      creado
      comentarios
    }
  }
`;

function DictationCreate() {
  const [nuevoDictamen] = useMutation(NUEVO_DICTAMEN, {
    update(cache, { data: { nuevoDictamen } }) {
      const { obtenerDictamenes } = cache.readQuery({
        query: OBTENER_DICTAMENES,
      });
      cache.writeQuery({
        query: OBTENER_DICTAMENES,
        data: { obtenerDictamenes: [...obtenerDictamenes, nuevoDictamen] },
      });
    },
  });
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  const formik = useFormik({
    initialValues: {
      numdama: "",
      digitodama: "",
      dictamen: "",
      subdictamen: "",
      razon: "",
      folio: "",
      monto: 0,
      fechapago: "",
      comentarios: "",
      gestor: "",
    },
    validationSchema: Yup.object({
      numdama: Yup.string().required(
        "El número de dama es obligatorio y no puede ir vacio."
      ),
      digitodama: Yup.string(
        "El dígito de dama es obligatorio y no puede ir vacio."
      ),
      dictamen: Yup.string().required(
        "El tipo de gestión del dictamen no puede ir vacio."
      ),
      subdictamen: Yup.string().required("El subdictamen no puede ir vacio."),
      razon: Yup.string().required("El motivo del dictamen no puede ir vacio."),
      comentarios: Yup.string().required("Debes ingresar un comentario breve."),
    }),
    onSubmit: async (valores) => {
      const {
        numdama,
        digitodama,
        dictamen,
        subdictamen,
        razon,
        folio,
        monto,
        fechapago,
        comentarios,
      } = valores;
      try {
        const { data } = await nuevoDictamen({
          variables: {
            input: {
              numdama,
              digitodama,
              dictamen,
              subdictamen,
              razon,
              folio,
              monto,
              fechapago,
              comentarios,
            },
          },
        });
        notification.open({
          message: "Registro exitoso",
          description: `El Dictamen se ha registrado con éxito.`,
          onClick: () => {
            console.log("Notification Clicked!");
          },
        });
        onClose();
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
    <>
      <Button type="primary" onClick={showDrawer} icon={<FileAddOutlined />}>
        Agregar
      </Button>
      <Drawer
        title="Crear nueva dictaminación"
        width={720}
        bodyStyle={{ paddingBottom: 80 }}
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
      >
        <Form
          {...layout}
          onFinish={formik.handleSubmit}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item label="Número y Dígito de Dama">
            <Row gutter={16}>
              <Col span={8}>
                <Input
                  placeholder="Número"
                  className="input-form"
                  name="numdama"
                  allowClear
                  value={formik.values.numdama}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.numdama && formik.errors.numdama ? (
                  <Alert
                    message={formik.errors.numdama}
                    type="error"
                    showIcon
                  />
                ) : null}
              </Col>
              <Col span={8}>
                <Input
                  placeholder="Dígito"
                  className="input-form"
                  name="digitodama"
                  allowClear
                  value={formik.values.digitodama}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.digitodama && formik.errors.digitodama ? (
                  <Alert
                    message={formik.errors.digitodama}
                    type="error"
                    showIcon
                  />
                ) : null}
              </Col>
            </Row>
          </Form.Item>

          <Form.Item label="Dictamen / Subdictamen / Motivo">
            <Row gutter={16}>
              {/* <Cascader
              size="large"
              options={DictationsOptions}
              placeholder="Selecciona el árbol de dictamen"
              //onChange={onChangeTree}
              allowClear
            /> */}
              <Col span={24}>
                <Input
                  placeholder="Tipo de gestión"
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
                  placeholder="Subdictamen"
                  className="input-form"
                  name="subdictamen"
                  allowClear
                  value={formik.values.subdictamen}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.subdictamen && formik.errors.subdictamen ? (
                  <Alert
                    message={formik.errors.subdictamen}
                    type="error"
                    showIcon
                  />
                ) : null}
              </Col>

              <Col span={24}>
                <Input
                  placeholder="Motivo"
                  className="input-form"
                  name="razon"
                  allowClear
                  value={formik.values.razon}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.razon && formik.errors.razon ? (
                  <Alert message={formik.errors.razon} type="error" showIcon />
                ) : null}
              </Col>
            </Row>
          </Form.Item>
          <Form.Item label="Fecha, Monto de pago y Folio de recibo">
            <InputGroup size="large">
              <Row gutter={8}>
                <Col span={8}>
                  <Input
                    className="input-form"
                    style={{ width: "100%" }}
                    name="fechapago"
                    allowClear
                    value={formik.values.fechapago}
                    onChange={formik.handleChange}
                  />
                </Col>
                <Col span={8}>
                  <Input
                    type="number"
                    className="input-form"
                    style={{ width: "100%" }}
                    placeholder="Ingresa el Monto"
                    name="monto"
                    allowClear
                    value={formik.values.monto}
                    onChange={formik.handleChange}
                  />
                </Col>
                <Col span={8}>
                  <Input
                    className="input-form"
                    placeholder="Folio"
                    name="folio"
                    allowClear
                    value={formik.values.folio}
                    onChange={formik.handleChange}
                  />
                </Col>
              </Row>
            </InputGroup>
          </Form.Item>
          <Form.Item label="Nota de seguimiento">
            <TextArea
              rows={4}
              placeholder="Agrega un comentario"
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
          </Form.Item>
          <div
            style={{
              position: "absolute",
              right: 0,
              bottom: 0,
              width: "100%",
              borderTop: "1px solid #e9e9e9",
              padding: "10px 16px",
              background: "#fff",
              textAlign: "right",
            }}
          >
            <Button size="large" style={{ marginRight: 8 }} onClick={onClose}>
              Cancelar
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              size="large"
            >
              Dictaminar
            </Button>
          </div>
        </Form>
      </Drawer>
    </>
  );
}

export default DictationCreate;
