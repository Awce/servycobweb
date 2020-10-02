import React from "react";
import { useQuery, gql } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { Tabs, Card, PageHeader, Row, Col, Descriptions } from "antd";
import Loading from "../../components/Loading";
import CampaignsLists from "../campaigns/CampaignsLists";
import AssignmentsList from "../assignments/AssignmentsList";
import { EnvironmentOutlined } from "@ant-design/icons";

const { TabPane } = Tabs;
const { Meta } = Card;

const OBTENER_CLIENTE = gql`
  query obtenerCliente($id: ID!) {
    obtenerCliente(id: $id) {
      empresa
      razonsocial
      email
      web
      logo
      telefono
      direccion
      rfc
    }
  }
`;

const CustomerDetail = (props) => {
  const { data, loading, error } = useQuery(OBTENER_CLIENTE, {
    variables: {
      id: props.match.params.Id,
    },
  });
  console.log(data);
  console.log(error);

  const history = useHistory();

  const goBack = () => {
    history.goBack();
  };

  if (loading) return <Loading />;

  const {
    empresa,
    razonsocial,
    email,
    web,
    logo,
    direccion,
    rfc,
  } = data.obtenerCliente;

  return (
    <div
      style={{ paddingLeft: "10px", marginTop: "10px", marginRight: "10px" }}
    >
      <PageHeader
        style={{
          border: "1px solid rgb(235, 237, 240)",
        }}
        title={razonsocial}
        subTitle="Detalles"
        onBack={goBack}
      />
      <Tabs defaultActiveKey="1">
        <TabPane tab="PERFIL" key="1">
          <Row gutter={16}>
            <Col span={6}>
              <Card
                cover={
                  <figure>
                    <img src={logo} alt={empresa} />
                  </figure>
                }
              >
                <Meta title={empresa} description={<EnvironmentOutlined />} />
                <span>{direccion}</span>
              </Card>
            </Col>
            <Col span={18}>
              <Card>
                <Descriptions title="Perfil" layout="vertical">
                  <Descriptions.Item label="Razón social">
                    {razonsocial}
                  </Descriptions.Item>
                  <Descriptions.Item label="Nombre">
                    {empresa}
                  </Descriptions.Item>
                  <Descriptions.Item label="RFC">{rfc}</Descriptions.Item>
                  <Descriptions.Item label="Correo">{email}</Descriptions.Item>
                  <Descriptions.Item label="Web">{web}</Descriptions.Item>
                </Descriptions>
              </Card>
            </Col>
          </Row>
        </TabPane>
        <TabPane tab="ASIGNACIONES" key="2">
          <AssignmentsList />
        </TabPane>
        <TabPane tab="CAMPAÑAS" key="3">
          <CampaignsLists />
        </TabPane>
        {/* <TabPane tab="FACTURACION Y COBRANZA" key="3">
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
        </TabPane> */}
      </Tabs>
    </div>
  );
};

export default CustomerDetail;
