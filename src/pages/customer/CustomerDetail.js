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
  Descriptions
} from "antd";
import { getCustomer } from "../../services/firebase";
import EditCustomerButton from "../../components/edit/EditCustomerButton";

const { TabPane } = Tabs;
const { Meta } = Card;

const CustomerDetail = props => {
  const [customer, setCustomer] = useState({});

  const history = useHistory();

  useEffect(() => {
    getCustomer(props.match.params.Id)
      .then(r => {
        setCustomer(r);
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
    namebusiness,
    logo,
    address,
    rfc,
    phone,
    cellphone,
    customerform,
    email,
    web
  } = customer;

  return (
    <div
      style={{ paddingLeft: "20px", marginTop: "10px", marginRight: "20px" }}
    >
      <PageHeader
        style={{
          border: "1px solid rgb(235, 237, 240)"
        }}
        title={namebusiness}
        subTitle="Detalles"
        onBack={goBack}
        extra={[<EditCustomerButton key="1" />]}
      />
      <Tabs defaultActiveKey="1">
        <TabPane tab="PERFIL" key="1">
          <Row gutter={16}>
            <Col span={6}>
              <Card
                cover={
                  <figure>
                    <img src={logo} alt={name} />
                  </figure>
                }
              >
                <Meta title={name} description={<Icon type="environment" />} />
                <span>{address}</span>
              </Card>
            </Col>
            <Col span={18}>
              <Card>
                <Descriptions title="Perfil">
                  <Descriptions.Item label="Razón social">
                    {namebusiness}
                  </Descriptions.Item>
                  <Descriptions.Item label="Nombre">{name}</Descriptions.Item>
                  <Descriptions.Item label="RFC">{rfc}</Descriptions.Item>
                  <Descriptions.Item label="Teléfono">
                    {phone}
                  </Descriptions.Item>
                  <Descriptions.Item label="Celular">
                    {cellphone}
                  </Descriptions.Item>
                  <Descriptions.Item label="Mienbro desde">
                    {customerform}
                  </Descriptions.Item>
                  <Descriptions.Item label="Correo">{email}</Descriptions.Item>
                  <Descriptions.Item label="Web">{web}</Descriptions.Item>
                </Descriptions>
              </Card>
            </Col>
          </Row>
        </TabPane>
        <TabPane tab="CAMPAÑAS" key="2">
          <Empty description={<span>No hay datos</span>} />
        </TabPane>
        <TabPane tab="FACTURACION Y COBRANZA" key="3">
          <Empty description={<span>No hay datos</span>} />
        </TabPane>
        <TabPane tab="GRUPOS DE TRABAJO" key="4">
          <Empty description={<span>No hay datos</span>} />
        </TabPane>

        <TabPane tab="BLOQUES DE EVALUACION" key="5">
          <Empty description={<span>No hay datos</span>} />
        </TabPane>
        <TabPane tab="BLOQUES DE DICTAMEN" key="6">
          <Empty description={<span>No hay datos</span>} />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default CustomerDetail;
