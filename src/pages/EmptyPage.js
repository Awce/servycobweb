import React from "react";
import { Empty } from "antd";

const EmptyPage = () => {
  return (
    <div style={{ marginTop: "10px" }}>
      <Empty description={<span>No hay datos</span>} />
    </div>
  );
};

export default EmptyPage;
