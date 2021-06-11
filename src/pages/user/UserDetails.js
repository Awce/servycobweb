import React from "react";
import { useQuery, gql } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { Tabs, Card, PageHeader, Row, Col, Descriptions, Tag } from "antd";
import Loading from "../../components/Loading";

const { TabPane } = Tabs;

const OBTENER_DETALLES_USUARIO = gql`
  query obtenerDetallesUsuario($id: ID!) {
    obtenerDetallesUsuario(id: $id) {
      id
      nombre
      apellido
      email
      avatar
      tipousuario
    }
  }
`;

const UserDetails = (props) => {
  const { data, loading, error } = useQuery(OBTENER_DETALLES_USUARIO, {
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
    nombre,
    apellido,
    email,
    avatar,
    tipousuario,
  } = data.obtenerDetallesUsuario;

  return (
    <div
      style={{ paddingLeft: "10px", marginTop: "10px", marginRight: "10px" }}
    >
      <PageHeader
        style={{
          border: "1px solid rgb(235, 237, 240)",
        }}
        title={`${nombre} ${apellido}`}
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
                    <img src={avatar} alt={nombre} />
                  </figure>
                }
              />
            </Col>
            <Col span={18}>
              <Card>
                <Descriptions title="Perfil" layout="vertical">
                  <Descriptions.Item label="Nombre(s)">
                    {nombre}
                  </Descriptions.Item>
                  <Descriptions.Item label="Apellido(s)">
                    {apellido}
                  </Descriptions.Item>
                  <Descriptions.Item label="Correo">{email}</Descriptions.Item>
                  <Descriptions.Item label="Tipo de Usuario">
                    {tipousuario === "Administrador" ? (
                      <Tag color="gold">{tipousuario}</Tag>
                    ) : null}
                    {tipousuario === "Gestor" ? (
                      <Tag color="blue">{tipousuario}</Tag>
                    ) : null}
                    {tipousuario === "Desarrollador" ? (
                      <Tag color="cyan">{tipousuario}</Tag>
                    ) : null}
                    {tipousuario === "Supervisor" ? (
                      <Tag color="purple">{tipousuario}</Tag>
                    ) : null}{" "}
                  </Descriptions.Item>
                </Descriptions>
              </Card>
            </Col>
          </Row>
        </TabPane>
        {/* <TabPane tab="BONOS" key="2">
          <Empty description={<span>No hay datos</span>} />
        </TabPane> */}
      </Tabs>
    </div>
  );
};

export default UserDetails;
