import React, { useState } from "react";
import XLSX from "xlsx";
import { useHistory } from "react-router-dom";
import { PageHeader, Button, message } from "antd";
import SteperAssignments from "../../components/SteperAssignments";
import "bulma/css/bulma.css";
import { CheckOutlined } from "@ant-design/icons";

const AssignmentCreate = () => {
  const [uploadFile, setUploadFile] = useState({ upload: false });
  const [readFile, setReadFile] = useState({ dataset: "", fileName: "" });

  const history = useHistory();

  const nextStep = () => {
    history.push("/asignaciones/verificar");
  };

  const goBack = () => {
    history.goBack();
  };

  const handleFileLoad = (e) => {
    console.log("Subiendo");
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.onload = (e) => {
      let data = new Uint8Array(e.target.result);
      let wb = XLSX.read(data, { type: "array" });
      let ws = wb.Sheets[wb.SheetNames[0]];
      let sheet = XLSX.utils.sheet_to_json(ws, { header: 1 });
      console.log(sheet);
      message.success(`${file.name} documento cargado exitosamente.`);
      setUploadFile({ upload: true });
      setReadFile({ dataset: sheet, fileName: file.name });
    };
    if (file) {
      reader.readAsArrayBuffer(file);
    } else {
      message.error("documento no cargado.");
    }
  };

  const { upload } = uploadFile;
  const { dataset, fileName } = readFile;
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
      <div className="field" style={{ marginTop: "10px" }}>
        <div className="file is-centered is-large is-boxed has-name">
          <label className="file-label">
            <input
              className="file-input"
              type="file"
              name="file"
              onChange={handleFileLoad}
              accept=".xlsx"
            />
            <span className="file-cta">
              <span className="file-icon">
                <i className="fas fa-upload"></i>
              </span>
              <span className="file-label">
                Haga clic o arrastre el archivo a esta área para cargar.
              </span>
            </span>
          </label>
        </div>
      </div>
      <div>
        <p>{fileName}</p>
        <p>{dataset[1]}</p>
      </div>
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
        {upload ? (
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            size="large"
            onClick={nextStep}
            style={{ marginRight: 8 }}
            icon={<CheckOutlined />}
          >
            Verificar importación
          </Button>
        ) : null}
      </div>
    </div>
  );
};

export default AssignmentCreate;
