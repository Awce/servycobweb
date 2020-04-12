import React from "react";
import { useHistory } from "react-router-dom";
import { PageHeader, Button, Icon } from "antd";
import SteperAssignments from "../../components/SteperAssignments";

const AssignmentUpload = () => {
  const history = useHistory();

  const nextStep = () => {
    history.push("/asignaciones");
  };

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
      <SteperAssignments />
      <h1>Exito</h1>
      <div
        style={{
          marginTop: "10px",
          right: 0,
          bottom: 0,
          width: "100%",
          borderTop: "1px solid #e9e9e9",
          padding: "10px 16px",
          background: "#fff",
          textAlign: "right",
        }}
      >
        <Button
          type="primary"
          htmlType="submit"
          className="login-form-button"
          size="large"
          onClick={nextStep}
          style={{ marginRight: 8 }}
        >
          <Icon type="check" /> Terminar
        </Button>
      </div>
    </div>
  );
};

export default AssignmentUpload;
