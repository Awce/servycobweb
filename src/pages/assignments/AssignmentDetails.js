import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  Tabs,
  Card,
  Icon,
  PageHeader,
  Empty,
  Row,
  Col,
  Descriptions,
  Button,
  Timeline
} from "antd";
import RegisterDictationButton from "../../components/register/RegisterDictationButton";
import { getContact } from "../../services/firebase";
import DictationsContactsList from "../dictations/DictationsContactsList";
import PaysContactList from "../pays/PaysContactList";

const { TabPane } = Tabs;

const AssignmentDetails = props => {
  const [contact, setContact] = useState({});
  const [count, setCount] = useState(0);
  const [callStatus, setCallStatus] = useState(false);

  const history = useHistory();

  useEffect(() => {
    getContact(props.match.params.Id)
      .then(r => {
        setContact(r);
      })
      .catch(e => {
        console.log(e);
      });
  });

  const goBack = () => {
    history.goBack();
  };

  const {
    name,
    balance,
    cellphone,
    idcontact,
    type,
    digit,
    areanumber,
    email
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
          border: "1px solid rgb(235, 237, 240)"
        }}
        title={name}
        subTitle="Detalles"
        onBack={goBack}
        extra={[<h1> ${balance}.00</h1>]}
      />
      <Tabs defaultActiveKey="1">
        <TabPane tab="DATOS GENERALES" key="1">
          <Row gutter={16}>
            <Col span={16}>
              <Card>
                <Descriptions title="Dama" layout="vertical">
                  <Descriptions.Item label="Número">
                    {idcontact}
                  </Descriptions.Item>
                  <Descriptions.Item label="Dígito">{digit}</Descriptions.Item>
                  <Descriptions.Item label="Nombre">{name}</Descriptions.Item>
                  <Descriptions.Item label="Tipo de cartera">
                    {type}
                  </Descriptions.Item>
                  <Descriptions.Item label="Zona">
                    {areanumber}
                  </Descriptions.Item>
                  <Descriptions.Item label="Correo">{email}</Descriptions.Item>
                </Descriptions>
                <Row gutter={16}>
                  <Col span={24}>
                    <Card>
                      <Tabs defaultActiveKey="1">
                        <TabPane tab="CONTACTO" key="1">
                          <Empty description={<span>No hay datos</span>} />
                        </TabPane>
                        <TabPane tab="DIRECCIONES" key="2">
                          <Empty description={<span>No hay datos</span>} />
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
                  border: "1px solid rgb(235, 237, 240)"
                }}
                title="Llamada"
                subTitle={callStatus ? "Iniciada" : "En espera"}
                extra={
                  count === 0 ? (
                    <Button type="primary" key={1} onClick={numberCounts}>
                      <Icon type="phone" /> Iniciar
                    </Button>
                  ) : (
                    <Button type="danger" key={1} onClick={stopCall}>
                      <Icon type="phone" /> Terminar
                    </Button>
                  )
                }
              />
              <Card>
                <p>{callStatus ? "Llamando al:" : "Llamar al:"}</p>
                <h1>{cellphone} </h1>
                <p> {count} intentos</p>
              </Card>
              <PageHeader
                style={{
                  border: "1px solid rgb(235, 237, 240)"
                }}
                title="Dictaminación"
                extra={[<RegisterDictationButton key={1} />]}
              />
              <Card>
                <Timeline pending="Dictaminando...">
                  <Timeline.Item color="green">
                    Visita a Domicilio 2015-09-01
                  </Timeline.Item>
                  <Timeline.Item>Pago a Cobrador 2015-09-01</Timeline.Item>
                  <Timeline.Item>Pago a Cobrador 2015-09-01</Timeline.Item>
                  <Timeline.Item>Pago a Cobrador 2015-09-01</Timeline.Item>
                </Timeline>
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
