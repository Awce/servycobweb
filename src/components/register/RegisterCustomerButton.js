import React, { useState } from "react";
import { Drawer, Button, Icon } from "antd";
import RegisterCustomerForm from "../../forms/register/RegisterCustomerForm";

const RegisterCustomerButton = () => {
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
        <Icon type="user-add" /> Crear nuevo cliente
      </Button>
      <Drawer
        title="Crear nuevo cliente"
        width={720}
        bodyStyle={{ paddingBottom: 80 }}
        onClose={onClose}
        visible={visible}
      >
        <RegisterCustomerForm />
      </Drawer>
    </div>
  );
};

export default RegisterCustomerButton;
