import React from "react";
import { useHistory } from "react-router-dom";
import { Steps } from "antd";
import {
  UploadOutlined,
  DatabaseOutlined,
  FileDoneOutlined,
} from "@ant-design/icons";

const SteperAssignments = () => {
  const { Step } = Steps;
  const history = useHistory();
  const { location } = history;

  const { pathname } = location;

  const url = pathname.split("/");

  const currentPath =
    url[url.length - 1] === "nueva"
      ? 0
      : url[url.length - 1] === "verificar"
      ? 1
      : 2;

  return (
    <div style={{ marginTop: "10px" }}>
      <Steps current={currentPath}>
        <Step title="Cargar archivo" icon={<UploadOutlined />} />
        <Step title="Verificar" icon={<FileDoneOutlined />} />
        <Step title="Subir a la base de datos" icon={<DatabaseOutlined />} />
      </Steps>
    </div>
  );
};

export default SteperAssignments;
