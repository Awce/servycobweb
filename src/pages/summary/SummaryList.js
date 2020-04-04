import React from "react";
import { PageHeader, Button, Icon } from "antd";

const SummaryList = () => {
  return (
    <div
      style={{ paddingLeft: "10px", marginTop: "10px", marginRight: "10px" }}
    >
      <PageHeader
        style={{
          border: "1px solid rgb(235, 237, 240)",
        }}
        title="Resumen"
        subTitle="Lista"
        extra={[
          <Button key={1}>
            <Icon type="download" /> Exportar resumen
          </Button>,
        ]}
      />
      <h1>Resumen</h1>
    </div>
  );
};

export default SummaryList;
