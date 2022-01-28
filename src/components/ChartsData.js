import React from "react";
import { List, Card, Row, Col, Progress } from "antd";

const data = [
  {
    title: "Asignaciones",
    content: "0",
    percent: "0",
  },
  {
    title: "Gestiones",
    content: "0",
    percent: "0",
  },
  {
    title: "Recuperados",
    content: "$ 0.00",
    percent: "0",
  },
];

const ChartsData = () => {
  return (
    <List
      grid={{ gutter: 16, column: 3 }}
      dataSource={data}
      style={{ marginTop: "3px" }}
      renderItem={(item) => (
        <List.Item>
          <Card>
            <Row gutter={16}>
              <Col span={14}>
                <h6>{item.title}</h6>
                <h1>{item.content}</h1>
              </Col>
              <Col span={10}>
                <Progress
                  type="circle"
                  percent={item.percent}
                  width={80}
                  strokeColor={{
                    "0%": "#108ee9",
                    "100%": "#87d068",
                  }}
                />
              </Col>
            </Row>
          </Card>
        </List.Item>
      )}
    />
  );
};

export default ChartsData;
