import React from "react";
import { useHistory } from "react-router-dom";
import { PageHeader } from "antd";

const AssignmentCreate = () => {
  const history = useHistory();

  const goBack = () => {
    history.goBack();
  };

  return (
    <div
      style={{ paddingLeft: "10px", marginTop: "10px", marginRight: "10px" }}
    >
      <PageHeader
        style={{
          border: "1px solid rgb(235, 237, 240)",
        }}
        title="Asignaciones"
        subTitle="Base de datos"
        onBack={goBack}
      />
      <h1>Aqui voy a subir el archivo</h1>
    </div>
  );
};

export default AssignmentCreate;
