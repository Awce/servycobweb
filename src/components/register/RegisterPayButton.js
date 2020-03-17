import React, { useState } from "react";
import { Drawer, Button, Icon, Form, Input, message } from "antd";
import { createPay } from "../../services/firebase";

const key = "updatable";

const RegisterPayButton = () => {
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
    setNewPay({
      amount: "",
      date: "",
      delivery_date: "",
      number: "",
      pay: "",
      yearcampaign: ""
    });
  };

  const { visible } = show;

  const [newPay, setNewPay] = useState({
    amount: "",
    date: "",
    delivery_date: "",
    number: "",
    pay: "",
    yearcampaign: ""
  });

  const [error, setError] = useState(false);

  const onChange = e => {
    setNewPay({
      ...newPay,
      [e.target.name]: e.target.value
    });
  };

  const payRegister = e => {
    e.preventDefault();
    if (
      amount.trim() === "" ||
      date.trim() === "" ||
      delivery_date.trim() === "" ||
      number.trim() === "" ||
      pay.trim() === "" ||
      yearcampaign.trim() === ""
    ) {
      setError(true);
      message.loading({ content: "Registrando pagos...", key });
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
    createPay(newPay)
      .then(() => {
        onClose();
        message.loading({ content: "Registrando pagos...", key });
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

  const { amount, date, delivery_date, number, pay, yearcampaign } = newPay;

  return (
    <div>
      <Button type="primary" onClick={showDrawer}>
        <Icon type="upload" /> Subir pagos
      </Button>
      <Drawer
        title="Capturar pago"
        width={720}
        bodyStyle={{ paddingBottom: 80 }}
        onClose={onClose}
        visible={visible}
      >
        <Form onSubmit={payRegister}>
          <Input
            placeholder="Fecha de Entrega"
            className="input-form"
            name="delivery_date"
            onChange={onChange}
            value={delivery_date}
          />
          <Input
            type="number"
            placeholder="Número de Dama"
            className="input-form"
            name="number"
            onChange={onChange}
            value={number}
          />
          <Input
            placeholder="Año campaña"
            className="input-form"
            name="yearcampaign"
            onChange={onChange}
            value={yearcampaign}
          />
          <Input
            type="date"
            placeholder="Fecha"
            className="input-form"
            name="date"
            onChange={onChange}
            value={date}
          />
          <Input
            type="number"
            placeholder="Saldo anterior"
            className="input-form"
            name="amount"
            onChange={onChange}
            value={amount}
          />
          <Input
            type="number"
            placeholder="Total pago"
            className="input-form"
            name="pay"
            onChange={onChange}
            value={pay}
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
              Registrar pago
            </Button>
          </div>
        </Form>
      </Drawer>
    </div>
  );
};

export default RegisterPayButton;
