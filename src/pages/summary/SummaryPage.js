import React from "react";
import ChartsData from "../../components/ChartsData";
import UserCalendar from "../../components/user/UserCalendar";
import TopSellers from "../../components/TopSellers";
import SummaryTrackMaps from "./SummaryTrackMaps";
import { Row, Col, PageHeader, Tabs } from "antd";
import { HomeOutlined, PushpinOutlined } from "@ant-design/icons";

const { TabPane } = Tabs;

const SummaryPage = () => {
  return (
    <div
      style={{ paddingLeft: "10px", marginTop: "10px", marginRight: "10px" }}
    >
      <Tabs defaultActiveKey="1">
        <TabPane
          tab={
            <span>
              <HomeOutlined />
              INFORMACION GENERAL
            </span>
          }
          key="1"
        >
          <div style={{ marginTop: "3px" }}>
            <PageHeader
              style={{
                border: "1px solid rgb(235, 237, 240)",
              }}
              title="Bienvenido"
              subTitle="Inicio"
            />
            <ChartsData />
            <Row gutter={16}>
              <Col span={16}>
                <UserCalendar />
              </Col>
              <Col span={8}>
                <TopSellers />
              </Col>
            </Row>
          </div>
        </TabPane>
        <TabPane
          tab={
            <span>
              <PushpinOutlined />
              UBICACIONES
            </span>
          }
          key="2"
        >
          <SummaryTrackMaps />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default SummaryPage;
