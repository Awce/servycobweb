import React from "react";
import UserCalendar from "../../components/user/UserCalendar";
import TopSellers from "../../components/TopSellers";
import { List, Card, Row, Col, PageHeader, Progress } from "antd";

const data = [
  {
    title: "Asignaciones",
    content: "99",
    percent: "90",
  },
  {
    title: "Gestiones",
    content: "4",
    percent: "10",
  },
  {
    title: "Recuperados",
    content: "$ 751.00",
    percent: "0.5",
  },
];

const SummaryPage = () => {
  return (
    <div
      style={{ paddingLeft: "10px", marginTop: "10px", marginRight: "10px" }}
    >
      <PageHeader
        style={{
          border: "1px solid rgb(235, 237, 240)",
        }}
        title="Bienvenido"
        subTitle="Inicio"
      />
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
      <Row gutter={16}>
        <Col span={16}>
          <UserCalendar />
        </Col>
        <Col span={8}>
          <TopSellers />
        </Col>
      </Row>
    </div>
  );
};

export default SummaryPage;
