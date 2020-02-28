import React from "react";
import { PageHeader } from "antd";

const AssignmentsList = () => {
  return (
    <div style={{ paddingLeft: "10px", marginTop: "10px" }}>
      <PageHeader
        style={{
          border: "1px solid rgb(235, 237, 240)"
        }}
        title="Asignaciones"
        subTitle="Call Center"
      />
    </div>
  );
};

export default AssignmentsList;
