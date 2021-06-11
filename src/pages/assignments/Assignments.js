import React from "react";
import AssignmentsList from "./AssignmentsList";
import AssignmentsUserList from "./AssignmentsUserList";
import { Tabs } from "antd";

const { TabPane } = Tabs;

function Assignments() {
  return (
    <div
      style={{ paddingLeft: "10px", marginTop: "10px", marginRight: "10px" }}
    >
      <Tabs defaultActiveKey="1">
        <TabPane tab="MOSTRAR TODAS" key="1">
          <AssignmentsList />
        </TabPane>
        <TabPane tab="MOSTRAR MIS ASIGNACIONES" key="2">
          <AssignmentsUserList />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default Assignments;
