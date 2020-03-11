import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Form, Input, Button, message } from "antd";
import { createCustomer } from "../../services/firebase";

const key = "updatable";

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
    if (
      name.trim() === "" ||
      bussinessname.trim() === "" ||
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
          duration: 2
        });
      }, 1000);
      return;
    }
    setError(!error);
    createCustomer(newCustomer)
      .then(() => {
        message.loading({ content: "Registrando cliente...", key });
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
      >
        Registrar cliente
      </Button>
    </Form>
  );
};

export default RegisterCustomerForm;
