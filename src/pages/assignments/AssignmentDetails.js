import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { useHistory } from "react-router-dom";
import {
  Card,
  PageHeader,
  Row,
  Col,
  Descriptions,
  Button,
  Statistic,
  Space,
} from "antd";
import Loading from "../../components/Loading";
import DictationCreate from "../dictations/DictationCreate";
import { PhoneOutlined } from "@ant-design/icons";

const OBTENER_ASIGNACION = gql`
  query obtenerAsignacion($id: ID!) {
    obtenerAsignacion(id: $id) {
      id
      tipocartera
      numdama
      digitodama
      nombre
      numerozonafacturacion
      aniocampaniasaldo
      diasmora
      campanasvencidas
      saldofactura
      saldocobro
      cargosmoratorios
      totalacobrar
      telefonocasa
      telefonocelular
      direccion
      colonia
      referencia
      poblacion
      estado
      codigopostal
      fechafacturacion
      fechafinalvigencia
      tipocuenta
      gestor
    }
  }
`;

const AssignmentDetails = (props) => {
  const { data, loading, error } = useQuery(OBTENER_ASIGNACION, {
    variables: {
      id: props.match.params.Id,
    },
  });
  console.log(data);
  console.log(error);

  const [count, setCount] = useState(0);
  const [callStatus, setCallStatus] = useState(false);

  const history = useHistory();

  const goBack = () => {
    history.goBack();
  };

  const numberCounts = () => {
    setCount(count + 1);
    setCallStatus(true);
  };

  const stopCall = () => {
    setCount(count);
    setCallStatus(false);
  };

  if (loading) return <Loading />;

  const {
    tipocartera,
    numdama,
    digitodama,
    nombre,
    numerozonafacturacion,
    aniocampaniasaldo,
    diasmora,
    campanasvencidas,
    saldofactura,
    saldocobro,
    cargosmoratorios,
    totalacobrar,
    telefonocasa,
    telefonocelular,
    direccion,
    colonia,
    referencia,
    poblacion,
    estado,
    codigopostal,
    fechafacturacion,
    fechafinalvigencia,
    tipocuenta,
  } = data.obtenerAsignacion;

  return (
    <div
      style={{ paddingLeft: "10px", marginTop: "10px", marginRight: "10px" }}
    >
      <PageHeader
        style={{
          border: "1px solid rgb(235, 237, 240)",
        }}
        title={nombre}
        subTitle="Detalles"
        onBack={goBack}
        extra={[
          <Space size="middle">
            <Statistic title="Total a Cobrar" prefix="$" value={totalacobrar} />
            <DictationCreate key={1} />
          </Space>,
        ]}
      />
      <Row gutter={16}>
        <Col span={16}>
          <Card>
            <Descriptions title="Datos de la dama" layout="vertical">
              <Descriptions.Item label="Número">{numdama}</Descriptions.Item>
              <Descriptions.Item label="Dígito">{digitodama}</Descriptions.Item>
              <Descriptions.Item label="Nombre">{nombre}</Descriptions.Item>
              <Descriptions.Item label="Tipo de cartera">
                {tipocartera}
              </Descriptions.Item>
              <Descriptions.Item label="Zona">
                {numerozonafacturacion}
              </Descriptions.Item>
              <Descriptions.Item label="Tipo de cuenta">
                {tipocuenta}
              </Descriptions.Item>
              <Descriptions.Item label="Año campaña">
                {aniocampaniasaldo}
              </Descriptions.Item>
              <Descriptions.Item label="Campañas venciadas">
                {campanasvencidas}
              </Descriptions.Item>
              <Descriptions.Item label="Días de mora">
                {diasmora}
              </Descriptions.Item>
              <Descriptions.Item label="Fecha de facturación">
                {fechafacturacion}
              </Descriptions.Item>
              <Descriptions.Item label="Fecha de vigencia">
                {fechafinalvigencia}
              </Descriptions.Item>
              <Descriptions.Item label="Saldo cobro">
                ${saldocobro}
              </Descriptions.Item>
              <Descriptions.Item label="Saldo factura">
                ${saldofactura}
              </Descriptions.Item>
              <Descriptions.Item label="Cargos moratorios">
                ${cargosmoratorios}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
        <Col span={8}>
          <PageHeader
            style={{
              border: "1px solid rgb(235, 237, 240)",
            }}
            title="Llamada"
            subTitle={callStatus ? "Iniciada" : "En espera"}
            extra={
              count === 0 ? (
                <Button
                  type="primary"
                  key={1}
                  onClick={numberCounts}
                  icon={<PhoneOutlined />}
                >
                  Iniciar
                </Button>
              ) : (
                <Button
                  type="danger"
                  key={1}
                  onClick={stopCall}
                  icon={<PhoneOutlined />}
                >
                  Terminar
                </Button>
              )
            }
          />
          <Card>
            <Row gutter={16}>
              <Col span={12}>
                <b>Teléfono casa</b>
                <p>{telefonocasa}</p>
              </Col>
              <Col span={12}>
                <b>Teléfono celular</b>
                <p>{telefonocelular}</p>
              </Col>
            </Row>
            <p>{callStatus ? "Llamando al:" : "Llamar al:"}</p>
            <Statistic
              prefix={<PhoneOutlined />}
              value={telefonocelular}
              groupSeparator="-"
            />
            <p> {count} intentos</p>
          </Card>
          <Card>
            <Row gutter={16}>
              <Descriptions title="Direcciónes">
                <Descriptions.Item label="Dirección completa">
                  {direccion}
                </Descriptions.Item>
                <Descriptions.Item label="Colonia">{colonia}</Descriptions.Item>
                <Descriptions.Item label="Código postal">
                  {codigopostal}
                </Descriptions.Item>
                <Descriptions.Item label="Estado">{estado}</Descriptions.Item>
                <Descriptions.Item label="Población">
                  {poblacion}
                </Descriptions.Item>
                <Descriptions.Item label="Referencia">
                  {referencia}
                </Descriptions.Item>
              </Descriptions>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AssignmentDetails;
