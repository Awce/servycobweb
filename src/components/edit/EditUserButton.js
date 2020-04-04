import React, { useState } from "react";
import { Drawer, Button, Icon } from "antd";

const EditUserButton = () => {
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
        <Icon type="edit" /> Editar Empleado
      </Button>
      <Drawer
        title="Editar "
        width={720}
        bodyStyle={{ paddingBottom: 80 }}
        onClose={onClose}
        visible={visible}
      >
        <h1>Editar Empleado</h1>
      </Drawer>
    </div>
  );
};

export default EditUserButton;
