import React, { useState } from "react";
import CustomerLogoForm from "../../forms/register/CustomerLogoForm";
import { Drawer, Button, Form, Input, message } from "antd";
import { createCustomer } from "../../services/firebase";
import { UserAddOutlined } from "@ant-design/icons";

const key = "updatable";

const RegisterCustomerButton = () => {
  const [show, setShow] = useState({
    visible: false,
  });

  const showDrawer = () => {
    setShow({
      visible: true,
    });
  };

  const onClose = () => {
    setShow({
      visible: false,
    });
    setNewCustomer({
      name: "",
      namebusiness: "",
      rfc: "",
      phone: "",
      cellphone: "",
      address: "",
      email: "",
      web: "",
      imageUrl: "",
    });
  };

  const { visible } = show;

  const [newCustomer, setNewCustomer] = useState({
    name: "",
    namebusiness: "",
    rfc: "",
    phone: "",
    cellphone: "",
    address: "",
    email: "",
    web: "",
    imageUrl: "",
  });

  const [error, setError] = useState(false);

  const onChange = (e) => {
    setNewCustomer({
      ...newCustomer,
      [e.target.name]: e.target.value,
    });
  };

  const customerRegister = (e) => {
    e.preventDefault();
    if (
      name.trim() === "" ||
      namebusiness.trim() === "" ||
      phone.trim() === "" ||
      address.trim() === "" ||
      email.trim() === ""
    ) {
      setError(true);
      message.loading({ content: "Registrando cliente...", key });
      setTimeout(() => {
        message.error({
          content: "Los campos son obliagatorios y no pueden ir vacios.",
          key,
          duration: 2,
        });
      }, 1000);
      return;
    }
    setError(!error);
    createCustomer(newCustomer)
      .then(() => {
        onClose();
        message.loading({ content: "Registrando cliente...", key });
        setTimeout(() => {
          message.success({
            content: "Genial.",
            key,
            duration: 2,
          });
        }, 1000);
      })
      .catch((error) => {
        let errorCode = error.code;
        let errorMessage = error.message;
        console.log(`${errorCode}: ${errorMessage}`);
      });
  };

  const {
    name,
    namebusiness,
    rfc,
    phone,
    cellphone,
    address,
    email,
    web,
    imageUrl,
  } = newCustomer;

  return (
    <div>
      <Button type="primary" onClick={showDrawer} icon={<UserAddOutlined />}>
        Crear nuevo cliente
      </Button>
      <Drawer
        title="Crear nuevo cliente"
        width={720}
        bodyStyle={{ paddingBottom: 80 }}
        onClose={onClose}
        visible={visible}
      >
        <Form onSubmit={customerRegister}>
          <CustomerLogoForm
            value={imageUrl}
            name="imageUrl"
            onChange={onChange}
          />
          <Input
            placeholder="Empresa"
            className="input-form"
            name="namebusiness"
            onChange={onChange}
            value={namebusiness}
          />
          <Input
            placeholder="Alias"
            className="input-form"
            name="name"
            onChange={onChange}
            value={name}
          />
          <Input
            placeholder="Correo electrónico"
            className="input-form"
            name="email"
            onChange={onChange}
            value={email}
          />
          <Input
            placeholder="Web"
            className="input-form"
            name="web"
            onChange={onChange}
            value={web}
          />
          <Input
            placeholder="RFC"
            className="input-form"
            name="rfc"
            onChange={onChange}
            value={rfc}
          />
          <Input
            type="Number"
            placeholder="Número de teléfono"
            className="input-form"
            name="phone"
            onChange={onChange}
            value={phone}
          />
          <Input
            type="Number"
            placeholder="Número de celular"
            className="input-form"
            name="cellphone"
            onChange={onChange}
            value={cellphone}
          />
          <Input
            placeholder="Dirección"
            className="input-form"
            name="address"
            onChange={onChange}
            value={address}
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
              textAlign: "right",
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
              icon="user"
            >
              Registrar cliente
            </Button>
          </div>
        </Form>
      </Drawer>
    </div>
  );
};

export default RegisterCustomerButton;
