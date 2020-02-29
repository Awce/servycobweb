import React, { useState } from "react";
import { Drawer, Button, Icon } from "antd";

const RegisterDictationButton = () => {
  const [show, setShow] = useState({
    visible: false
  });

  const showDrawer = () => {
    setShow({
      visible: true
    });
  };

  const onClose = () => {
    setShow({
      visible: false
    });
  };

  const { visible } = show;
  return (
    <div>
      <Button type="primary" onClick={showDrawer}>
        <Icon type="file-add" /> Agregar
      </Button>
      <Drawer
        title="Crear nueva dictaminación"
        width={720}
        bodyStyle={{ paddingBottom: 80 }}
        onClose={onClose}
        visible={visible}
      >
        <h1>Soy la nueva dictaminación</h1>
      </Drawer>
    </div>
  );
};

export default RegisterDictationButton;
