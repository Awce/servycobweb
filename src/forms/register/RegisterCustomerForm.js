import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Form, Icon, Input, Button, message, notification } from "antd";

const RegisterCustomerForm = () => {
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    bussinessname: "",
    rfc: "",
    phone: "",
    cellphone: "",
    address: "",
    email: "",
    web: ""
  });

  const [error, setError] = useState(false);

  const onChange = e => {
    setNewCustomer({
      ...newCustomer,
      [e.target.name]: e.target.value
    });
  };

  let history = useHistory();

  const customerRegister = e => {
    e.preventDefault();
    console.log("test");
  };

  const openNotification = () => {
    notification.open({
      message: "Registro exitoso",
      description: `Esta listo para crear Campañas.`,
      onClick: () => {
        console.log("Notification Clicked!");
      }
    });
  };

  const {
    name,
    bussinessname,
    rfc,
    phone,
    cellphone,
    address,
    email,
    web
  } = newCustomer;

  return (
    <Form onSubmit={customerRegister}>
      <Input
        placeholder="Empresa"
        className="input-form"
        name="bussinessname"
        onChange={onChange}
        value={bussinessname}
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
      <Button
        type="primary"
        htmlType="submit"
        className="login-form-button"
        size="large"
        block
        onClick={openNotification}
      >
        Registrar cliente
      </Button>
    </Form>
  );
};

export default RegisterCustomerForm;
