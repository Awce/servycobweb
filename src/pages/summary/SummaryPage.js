import React, { useContext, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import {
  List,
  Card,
  Row,
  Col,
  Calendar,
  PageHeader,
  Progress,
  Avatar
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

const data2 = [
  {
    title: "Ant Design Title 1"
  },
  {
    title: "Ant Design Title 2"
  },
  {
    title: "Ant Design Title 3"
  },
  {
    title: "Ant Design Title 4"
  }
];

const SummaryPage = () => {
  const { user, login } = useContext(UserContext);

  useEffect(() => {
    login();
  }, []);

  const onPanelChange = (value, mode) => {
    console.log(value, mode);
  };
  return (
    <div
      style={{ paddingLeft: "10px", marginTop: "10px", marginRight: "10px" }}
    >
      <PageHeader
        style={{
          border: "1px solid rgb(235, 237, 240)"
        }}
        title={user && `Bienvenido, ${user.email}`}
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
          <Card title="Top Gestores">
            <List
              itemLayout="horizontal"
              dataSource={data2}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                    }
                    title={<a href="https://ant.design">{item.title}</a>}
                    description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default SummaryPage;
