import React, { useState, useEffect } from "react";
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
import RegisterDictationButton from "../../components/register/RegisterDictationButton";
import { getContact } from "../../services/firebase";
import DictationsContactsList from "../dictations/DictationsContactsList";
import PaysContactList from "../pays/PaysContactList";
import DictationsContactsPrevList from "../dictations/DictationsContactsPrevList";
import { PhoneOutlined } from "@ant-design/icons";

const { TabPane } = Tabs;

const AssignmentDetails = (props) => {
  const [contact, setContact] = useState({});
  const [count, setCount] = useState(0);
  const [callStatus, setCallStatus] = useState(false);

  const history = useHistory();

  useEffect(() => {
    getContact(props.match.params.Id)
      .then((r) => {
        setContact(r);
      })
      .catch((e) => {
        console.log(e);
      });
  });

  const goBack = () => {
    history.goBack();
  };

  const {
    aniocampania,
    campaniasvencidas,
    cargosmoratorios,
    codigopostal,
    colonia,
    diasmora,
    digitodama,
    direccion,
    estado,
    fechafacturacion,
    fechafinalvigencia,
    gastoscobranza,
    nombre,
    numdama,
    numerozonafacturacion,
    poblacion,
    referencia,
    saldocobro,
    telefonocasa,
    telefonocelular,
    tipocartera,
    tipodecuenta,
    totalacobrar,
  } = contact;

  const numberCounts = () => {
    setCount(count + 1);
    setCallStatus(true);
  };

  const stopCall = () => {
    setCount(count);
    setCallStatus(false);
  };

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
                    {tipodecuenta}
                  </Descriptions.Item>
                  <Descriptions.Item label="Año campaña">
                    {aniocampania}
                  </Descriptions.Item>
                  <Descriptions.Item label="Campañas venciadas">
                    {campaniasvencidas}
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
                  <Descriptions.Item label="Gastos de cobranza">
                    ${gastoscobranza}
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
                extra={[<RegisterDictationButton key={1} />]}
              />
              <Card>
                <DictationsContactsPrevList />
              </Card>
            </Col>
          </Row>
        </TabPane>
        <TabPane tab="HISTORIAL DE DICTAMINACION" key="2">
          <DictationsContactsList />
        </TabPane>
        <TabPane tab="HISTORIAL DE PAGOS" key="3">
          <PaysContactList />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default AssignmentDetails;
