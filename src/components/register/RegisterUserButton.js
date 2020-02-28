import React, { useState } from "react";
import { Drawer, Button, Icon } from "antd";
import RegisterForm from "../../forms/register/RegisterForm";

const RegisterUserButton = () => {
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
      <Button type="primary" size="large" onClick={showDrawer}>
        <Icon type="user-add" /> Crear nuevo usuario
      </Button>
      <Drawer
        title="Crear nuevo usuario"
        width={720}
        bodyStyle={{ paddingBottom: 80 }}
        onClose={onClose}
        visible={visible}
      >
        <RegisterForm />
      </Drawer>
    </div>
  );
};

export default RegisterUserButton;
