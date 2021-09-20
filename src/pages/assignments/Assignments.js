import React from "react";
import AssignmentsList from "./AssignmentsList";
import AssignmentsUserList from "./AssignmentsUserList";
import { Tabs } from "antd";
import { OrderedListOutlined } from "@ant-design/icons";

const { TabPane } = Tabs;

function Assignments() {
  return (
    <div
      style={{ paddingLeft: "10px", marginTop: "10px", marginRight: "10px" }}
    >
      <Tabs defaultActiveKey={1}>
        <TabPane
          tab={
            <span>
              <OrderedListOutlined />
              MIS ASIGNACIONES
            </span>
          }
          key={1}
        >
          <AssignmentsUserList />
        </TabPane>
        <TabPane
          tab={
            <span>
              <OrderedListOutlined />
              MOSTRAR TODAS
            </span>
          }
          key={2}
        >
          <AssignmentsList />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default Assignments;
