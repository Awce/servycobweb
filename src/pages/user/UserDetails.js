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
import { getUser } from "../../services/firebase";

const { TabPane } = Tabs;
const { Meta } = Card;

const UserDetails = props => {
  const [user, setUser] = useState({});
  const history = useHistory();

  useEffect(() => {
    getUser(props.match.params.Id)
      .then(r => {
        setUser(r);
      })
      .catch(e => {
        console.log(e);
      });
  });

  const goBack = () => {
    history.goBack();
  };

  const { name, lastname, email, imageUrl } = user;

  return (
    <div
      style={{ paddingLeft: "20px", marginTop: "10px", marginRight: "20px" }}
    >
      <PageHeader
        style={{
          border: "1px solid rgb(235, 237, 240)"
        }}
        title={`${name} ${lastname}`}
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
                    <img src={imageUrl} alt={name} />
                  </figure>
                }
              >
                <Meta
                  title={`${name} ${lastname}`}
                  description={<Icon type="environment" />}
                />
              </Card>
            </Col>
            <Col span={18}>
              <Card>
                <Descriptions title="Perfil">
                  <Descriptions.Item label="Nombre(s)">
                    {name}
                  </Descriptions.Item>
                  <Descriptions.Item label="Apellido(s)">
                    {lastname}
                  </Descriptions.Item>
                  <Descriptions.Item label="Correo">{email}</Descriptions.Item>
                </Descriptions>
              </Card>
            </Col>
          </Row>
        </TabPane>
        <TabPane tab="BONOS" key="2">
          <Empty description={<span>No hay datos</span>} />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default UserDetails;
