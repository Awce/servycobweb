import React from "react";
import { useHistory } from "react-router-dom";
import { Steps, Icon } from "antd";

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
        <Step title="Cargar archivo" icon={<Icon type="upload" />} />
        <Step title="Verificar" icon={<Icon type="file-done" />} />
        <Step
          title="Subir a la base de datos"
          icon={<Icon type="database" />}
        />
      </Steps>
    </div>
  );
};

export default SteperAssignments;
