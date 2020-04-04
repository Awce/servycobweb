import React from "react";
import { PageHeader, Button, Upload, Icon, message } from "antd";

const props = {
  name: "file",
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  headers: {
    authorization: "authorization-text",
  },
  onChange(info) {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} documento cargado exitosamente`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} la carga del archivo falló.`);
    }
  },
};

const AssignmentsUpload = () => {
  return (
    <div
      style={{ paddingLeft: "10px", marginTop: "10px", marginRight: "10px" }}
    >
      <PageHeader
        style={{
          border: "1px solid rgb(235, 237, 240)",
        }}
        title="Asignaciones"
        subTitle="Call Center"
        extra={[
          <Button key={2}>
            <Icon type="download" /> Exportar asignaciones
          </Button>,
          <Upload {...props}>
            <Button type="primary" key={1}>
              <Icon type="upload" /> Importar asignaciones
            </Button>
          </Upload>,
        ]}
      />
    </div>
  );
};

export default AssignmentsUpload;
