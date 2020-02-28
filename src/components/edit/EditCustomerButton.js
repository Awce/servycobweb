import React, { useState } from "react";
import { Drawer, Button, Icon } from "antd";

const EditCustomerButton = () => {
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
        <Icon type="edit" /> Editar cliente
      </Button>
      <Drawer
        title="Editar cliente"
        width={720}
        bodyStyle={{ paddingBottom: 80 }}
        onClose={onClose}
        visible={visible}
      >
        <h1>Editar Cliente</h1>
      </Drawer>
    </div>
  );
};

export default EditCustomerButton;
