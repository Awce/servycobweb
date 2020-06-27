import React, { useState } from "react";
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
} from "antd";
import Loading from "../../components/Loading";
import DictationCreate from "../dictations/DictationCreate";
import DictationsContactsList from "../dictations/DictationsContactsList";
import PaysContactList from "../pays/PaysContactList";
import { PhoneOutlined } from "@ant-design/icons";

const { TabPane } = Tabs;

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
          <Statistic title="Total a Cobrar" prefix="$" value={totalacobrar} />,
        ]}
      />
      <Tabs defaultActiveKey="1">
        <TabPane tab="DATOS GENERALES" key="1">
          <Row gutter={16}>
            <Col span={16}>
              <Card>
                <Descriptions title="Dama" layout="vertical">
                  <Descriptions.Item label="Número">
                    {numdama}
                  </Descriptions.Item>
                  <Descriptions.Item label="Dígito">
                    {digitodama}
                  </Descriptions.Item>
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
                <Row gutter={16}>
                  <Col span={24}>
                    <Card>
                      <Tabs defaultActiveKey="1">
                        <TabPane tab="NUMEROS DE CONTACTO" key="1">
                          <Row gutter={16}>
                            <Col span={12}>
                              <Statistic
                                title="Telefono casa"
                                prefix={<PhoneOutlined />}
                                value={telefonocasa}
                                groupSeparator="-"
                              />
                            </Col>
                            <Col span={12}>
                              <Statistic
                                title="Telefono celular"
                                prefix={<PhoneOutlined />}
                                value={telefonocelular}
                                groupSeparator="-"
                              />
                            </Col>
                          </Row>
                        </TabPane>
                        <TabPane tab="DIRECCIONES" key="2">
                          <Descriptions>
                            <Descriptions.Item label="Dirección">
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
                        </TabPane>
                      </Tabs>
                    </Card>
                  </Col>
                </Row>
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
                <p>{callStatus ? "Llamando al:" : "Llamar al:"}</p>
                <Statistic
                  prefix={<PhoneOutlined />}
                  value={telefonocelular}
                  groupSeparator="-"
                />
                <p> {count} intentos</p>
              </Card>
              <PageHeader
                style={{
                  border: "1px solid rgb(235, 237, 240)",
                }}
                title="Dictaminación"
                extra={[<DictationCreate key={1} />]}
              />
            </Col>
          </Row>
        </TabPane>
        {/* <TabPane tab="HISTORIAL DE DICTAMINACION" key="2">
          <DictationsContactsList />
        </TabPane>
        <TabPane tab="HISTORIAL DE PAGOS" key="3">
          <PaysContactList />
        </TabPane> */}
      </Tabs>
    </div>
  );
};

export default AssignmentDetails;
