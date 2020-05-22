import React from "react";
import { Spin } from "antd";
import "bulma/css/bulma.css";

const Loading = () => {
  return (
    <div className="container is-fluid">
      <div
        className="level-item has-text-centered"
        style={{ paddingTop: "20px" }}
      >
        <Spin size="large" tip="Cargando..." />
      </div>
    </div>
  );
};

export default Loading;
