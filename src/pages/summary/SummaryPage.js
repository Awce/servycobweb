import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import {
  List,
  Card,
  Row,
  Col,
  Calendar,
  Empty,
  PageHeader,
  Progress
} from "antd";

const data = [
  {
    title: "Hoy",
    content: "10"
  },
  {
    title: "Confirmadas",
    content: "8"
  },
  {
    title: "Realizadas",
    content: "3"
  },
  {
    title: "Recuperados",
    content: "$15,000"
  }
];

const SummaryPage = () => {
  const { user } = useContext(UserContext);
  const onPanelChange = (value, mode) => {
    console.log(value, mode);
  };
  return (
    <div
      style={{ paddingLeft: "20px", marginTop: "10px", marginRight: "20px" }}
    >
      <PageHeader
        style={{
          border: "1px solid rgb(235, 237, 240)"
        }}
        title={user && `Bienvenido, ${user.name}`}
        subTitle="Inicio"
      />
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={data}
        style={{ marginTop: "3px" }}
        renderItem={item => (
          <List.Item>
            <Card>
              <Row gutter={16}>
                <Col span={14}>
                  <h6>{item.title}</h6>
                  <h1>{item.content}</h1>
                </Col>
                <Col span={10}>
                  <Progress type="circle" percent={30} width={80} />
                </Col>
              </Row>
            </Card>
          </List.Item>
        )}
      />
      <Row gutter={16}>
        <Col span={16}>
          <Card>
            <Calendar onPanelChange={onPanelChange} />
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Top Visitadores">
            <Empty description={<span>No hay datos</span>} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default SummaryPage;
