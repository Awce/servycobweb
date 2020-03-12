import React, { useState } from "react";
import { Drawer, Button, Icon, Form, Input, message } from "antd";
import { createCampaign } from "../../services/firebase";

const key = "updatable";

const RegisterCampaignButton = () => {
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
    setNewCampaign({
      name: "",
      description: ""
    });
  };

  const { visible } = show;

  const [newCampaign, setNewCampaign] = useState({
    name: "",
    description: ""
  });

  const [error, setError] = useState(false);

  const onChange = e => {
    setNewCampaign({
      ...newCampaign,
      [e.target.name]: e.target.value
    });
  };

  const campaignRegister = e => {
    e.preventDefault();
    if (name.trim() === "") {
      setError(true);
      message.loading({ content: "Registrando campaña...", key });
      setTimeout(() => {
        message.error({
          content: "Los campos son obliagatorios y no pueden ir vacios.",
          key,
          duration: 2
        });
      }, 1000);
      return;
    }
    setError(!error);
    createCampaign(newCampaign)
      .then(() => {
        onClose();
        message.loading({ content: "Registrando campaña...", key });
        setTimeout(() => {
          message.success({
            content: "Genial.",
            key,
            duration: 2
          });
        }, 1000);
      })
      .catch(error => {
        let errorCode = error.code;
        let errorMessage = error.message;
        console.log(`${errorCode}: ${errorMessage}`);
      });
  };

  const { name, description } = newCampaign;

  return (
    <div>
      <Button type="primary" onClick={showDrawer}>
        <Icon type="file-protect" /> Crear campaña
      </Button>
      <Drawer
        title="Crear campaña"
        width={720}
        bodyStyle={{ paddingBottom: 80 }}
        onClose={onClose}
        visible={visible}
      >
        <Form onSubmit={campaignRegister}>
          <Input
            placeholder="Campaña"
            className="input-form"
            name="name"
            onChange={onChange}
            value={name}
          />
          <Input
            placeholder="Descripción"
            className="input-form"
            name="description"
            onChange={onChange}
            value={description}
          />
          <div
            style={{
              position: "absolute",
              right: 0,
              bottom: 0,
              width: "100%",
              borderTop: "1px solid #e9e9e9",
              padding: "10px 16px",
              background: "#fff",
              textAlign: "right"
            }}
          >
            <Button onClick={onClose} size="large" style={{ marginRight: 8 }}>
              Cancelar
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              size="large"
              icon="file-protect"
            >
              Registrar campaña
            </Button>
          </div>
        </Form>
      </Drawer>
    </div>
  );
};

export default RegisterCampaignButton;
