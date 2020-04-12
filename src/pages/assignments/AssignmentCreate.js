import React, { useState } from "react";
import XLSX from "xlsx";
import { useHistory } from "react-router-dom";
import { PageHeader, Upload, Button, Icon, message } from "antd";
import SteperAssignments from "../../components/SteperAssignments";

const AssignmentCreate = () => {
  const [uploadFile, setUploadFile] = useState({ upload: false });
  const [readFile, setReadFile] = useState({ dataset: "", fileName: "" });
  const { Dragger } = Upload;

  const props = {
    name: "file",
    multiple: true,
    accept: ".xlsx",
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
        setUploadFile({ upload: true });
        handleFileLoad(info.file);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
        setUploadFile({ upload: false });
      }
    },
  };

  const history = useHistory();

  const nextStep = () => {
    history.push("/asignaciones/verificar");
  };

  const goBack = () => {
    history.goBack();
  };

  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("OK");
    }, 100);
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
      setReadFile({ dataset: sheet, fileName: file.name });
    };
    reader.readAsArrayBuffer(file);
  };

  // const transform = (file) => {
  //     return new Promise((resolve) => {
  //       const reader = new FileReader();
  //       reader.readAsArrayBuffer(file);

  //       reader.onload = () => {
  //         const data = new Uint8Array(reader.result);
  //         const wb = XLSX.read(data, { type: "array" });
  //         const htmlstr = XLSX.write(wb, {
  //           sheet: "sheet",
  //           type: "binary",
  //           bookType: "html",
  //         });
  //         console.log(htmlstr);
  //       };
  //     });
  //   },

  const { upload } = uploadFile;
  const { fileName } = readFile;
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
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <Icon type="inbox" />
        </p>
        <p className="ant-upload-text">
          Haga clic o arrastre el archivo a esta área para cargar
        </p>
        <p className="ant-upload-hint">
          Soporte para una carga individual o masiva.
        </p>
      </Dragger>
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
          >
            <Icon type="check" /> Verificar importación
          </Button>
        ) : null}
      </div>
      <input name="file" type="file" onChange={handleFileLoad} />
      <p>{fileName}</p>
    </div>
  );
};

export default AssignmentCreate;
