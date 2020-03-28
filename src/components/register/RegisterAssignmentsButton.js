import React, { useState } from "react";
import { Modal, Button, Icon } from "antd";

const RegisterAssignmentsButton = () => {
  const [show, setShow] = useState({
    visible: false,
    loading: false
  });

  const showModal = () => {
    setShow({
      visible: true
    });
  };

  const handleOk = () => {
    setShow({
      loading: true
    });
    setTimeout(() => {
      setShow({
        loading: false,
        visible: false
      });
    }, 3000);
  };

  const handleCancel = () => {
    setShow({
      visible: false
    });
  };

  const { visible, loading } = show;

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        <Icon type="upload" /> Cargar base de datos
      </Button>
      <Modal
        title="Base de datos"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancelar
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={handleOk}
          >
            Aceptar
          </Button>
        ]}
      >
        <p>Hola</p>
      </Modal>
    </div>
  );
};

export default RegisterAssignmentsButton;
