import React from "react";
import { Button, Icon } from "antd";

const DownloadPayButton = () => {
  const downloadExcel = () => {
    console.log("test");
  };

  return (
    <div>
      <Button onClick={downloadExcel}>
        <Icon type="upload" /> Bajar pagos
      </Button>
    </div>
  );
};

export default DownloadPayButton;
