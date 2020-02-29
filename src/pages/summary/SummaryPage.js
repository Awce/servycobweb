import React from "react";
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
    title: "Title 1",
    content: "Prueba 1"
  },
  {
    title: "Title 2",
    content: "Prueba 2"
  },
  {
    title: "Title 3",
    content: "Prueba 3"
  },
  {
    title: "Title 4",
    content: "Prueba 4"
  }
];

const SummaryPage = () => {
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
        title="Bienvenido"
        subTitle="Inicio"
      />
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={data}
        renderItem={item => (
          <List.Item>
            <Card>
              {item.content} <Progress type="circle" percent={30} width={80} />
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
