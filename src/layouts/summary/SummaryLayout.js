import React from "react";
import { Layout, List, Card, Row, Col, Calendar } from "antd";
import LateralMenu from "../../components/LateralMenu";
import NavbarMenu from "../../components/NavbarMenu";

const { Header, Sider, Content } = Layout;
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

const SummaryLayout = () => {
  const onPanelChange = (value, mode) => {
    console.log(value, mode);
  };

  return (
    <Layout>
      <Header style={{ background: "#fff" }}>
        <Content>
          <NavbarMenu />
        </Content>
      </Header>
      <Layout>
        <Sider collapsible style={{ marginTop: "1px" }} theme="light">
          <LateralMenu />
        </Sider>
        <Content
          style={{
            marginTop: "1px",
            padding: 0,
            background: "#fff"
          }}
        >
          <div style={{ paddingLeft: "10px", marginTop: "10px" }}>
            <h1>Bienvenido</h1>
            <List
              grid={{ gutter: 16, column: 4 }}
              dataSource={data}
              renderItem={item => (
                <List.Item>
                  <Card>{item.content}</Card>
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
                  <h1>ok</h1>
                </Card>
              </Col>
            </Row>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default SummaryLayout;
