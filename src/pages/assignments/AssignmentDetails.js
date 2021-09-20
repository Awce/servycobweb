import React, { useState } from "react";
//import DictationsAssignmentsList from ".././dictations/DictationsAssignmentsList";
import { useQuery, gql } from "@apollo/client";
import { useHistory } from "react-router-dom";
import {
  Tabs,
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
import { PhoneOutlined, ReconciliationOutlined } from "@ant-design/icons";

const { TabPane } = Tabs;

const OBTENER_ASIGNACION = gql`
  query obtenerAsignacion($id: ID!) {
    obtenerAsignacion(id: $id) {
      id
      campanaventa
      ruta
      numerozonafacturacion
      liquidacion
      numdama
      digitodama
      nombre
      direccion
      colonia
      poblacion
      estado
      codigopostal
      referencia
      telefonocasa
      telefonocelular
      totalacobrar
      aniocampaniasaldo
      campanasvencidas
      cau
      idsituacion
      descsituacion
      idsituacioncie
      descsituacioncie
      tipocartera
      cierre
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

  const onRegisterDictationButton = () => {
    history.push(`/gestiones/crear/${data.obtenerAsignacion.id}`);
  };

  if (loading) return <Loading />;

  const {
    campanaventa,
    ruta,
    numerozonafacturacion,
    liquidacion,
    numdama,
    digitodama,
    nombre,
    direccion,
    colonia,
    poblacion,
    estado,
    codigopostal,
    referencia,
    telefonocasa,
    telefonocelular,
    totalacobrar,
    aniocampaniasaldo,
    campanasvencidas,
    cau,
    idsituacion,
    descsituacion,
    idsituacioncie,
    descsituacioncie,
    tipocartera,
    cierre,
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
            <Button
              type="primary"
              key={2}
              onClick={onRegisterDictationButton}
              icon={<ReconciliationOutlined />}
            >
              Crear Gestión
            </Button>
          </Space>,
        ]}
      />
      <Tabs defaultActiveKey={1}>
        <TabPane tab="PERFIL" key={1}>
          <div style={{ marginTop: "3px" }}>
            <Row gutter={16}>
              <Col span={16}>
                <Card>
                  <Descriptions title="Datos de la dama" layout="vertical">
                    <Descriptions.Item label="Número">
                      {numdama}
                    </Descriptions.Item>
                    <Descriptions.Item label="Dígito">
                      {digitodama}
                    </Descriptions.Item>
                    <Descriptions.Item label="Nombre">
                      {nombre}
                    </Descriptions.Item>
                    <Descriptions.Item label="Zona">
                      {numerozonafacturacion}
                    </Descriptions.Item>
                    <Descriptions.Item label="Tipo cartera">
                      {tipocartera}
                    </Descriptions.Item>
                    <Descriptions.Item label="Año campaña">
                      {aniocampaniasaldo}
                    </Descriptions.Item>
                    <Descriptions.Item label="Campañas venciadas">
                      {campanasvencidas}
                    </Descriptions.Item>
                    <Descriptions.Item label="Campaña venta">
                      {campanaventa}
                    </Descriptions.Item>
                    <Descriptions.Item label="Ruta">{ruta}</Descriptions.Item>
                    <Descriptions.Item label="Liquidación">
                      {liquidacion}
                    </Descriptions.Item>
                    <Descriptions.Item label="CAU">${cau}</Descriptions.Item>
                    <Descriptions.Item label="Id situación">
                      {idsituacion}
                    </Descriptions.Item>
                    <Descriptions.Item label="Desc situación">
                      {descsituacion}
                    </Descriptions.Item>
                    <Descriptions.Item label="Id situación Cie">
                      {idsituacioncie}
                    </Descriptions.Item>
                    <Descriptions.Item label="Desc situación Cie">
                      {descsituacioncie}
                    </Descriptions.Item>
                    <Descriptions.Item label="Cierre">
                      {cierre}
                    </Descriptions.Item>
                  </Descriptions>
                </Card>
                <div style={{ marginTop: "3px" }}>
                  <Card>
                    <Descriptions title="Direcciónes" layout="vertical">
                      <Descriptions.Item label="Dirección completa">
                        {direccion}
                      </Descriptions.Item>
                      <Descriptions.Item label="Colonia">
                        {colonia}
                      </Descriptions.Item>
                      <Descriptions.Item label="Código postal">
                        {codigopostal}
                      </Descriptions.Item>
                      <Descriptions.Item label="Estado">
                        {estado}
                      </Descriptions.Item>
                      <Descriptions.Item label="Población">
                        {poblacion}
                      </Descriptions.Item>
                      <Descriptions.Item label="Referencia">
                        {referencia}
                      </Descriptions.Item>
                    </Descriptions>
                  </Card>
                </div>
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
                <div style={{ marginTop: "3px" }}>
                  <Card>
                    <p>{callStatus ? "Llamando al:" : "Llamar al:"}</p>
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
                    <p> {count} intentos</p>
                  </Card>
                </div>
              </Col>
            </Row>
          </div>
        </TabPane>
        {/* <TabPane tab="GESTIONES" key={2}>
          <DictationsAssignmentsList />
        </TabPane> */}
      </Tabs>
    </div>
  );
};

export default AssignmentDetails;
