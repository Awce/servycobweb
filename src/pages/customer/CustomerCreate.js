import React, { useState } from "react";
import { createCustomer } from "../../services/firebase";
import { useHistory } from "react-router-dom";
import {
  PageHeader,
  Tabs,
  Row,
  Col,
  Card,
  Button,
  Form,
  Input,
  message,
} from "antd";
import {
  PhoneOutlined,
  MailOutlined,
  GlobalOutlined,
  UserAddOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";

const key = "updatable";
const { TabPane } = Tabs;

const CustomerCreate = () => {
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    namebusiness: "",
    rfc: "",
    phone: "",
    cellphone: "",
    address: "",
    email: "",
    web: "",
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
        message.loading({ content: "Registrando cliente...", key });
        setTimeout(() => {
          message.success({
            content: "Genial.",
            key,
            duration: 2,
          });
        }, 1000);
        goBack();
      })
      .catch((error) => {
        let errorCode = error.code;
        let errorMessage = error.message;
        console.log(`${errorCode}: ${errorMessage}`);
      });
  };

  const history = useHistory();

  const goBack = () => {
    history.goBack();
    setNewCustomer({
      name: "",
      namebusiness: "",
      rfc: "",
      phone: "",
      cellphone: "",
      address: "",
      email: "",
      web: "",
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
  } = newCustomer;

  return (
    <div
      style={{ paddingLeft: "10px", marginTop: "10px", marginRight: "10px" }}
    >
      <PageHeader
        style={{
          border: "1px solid rgb(235, 237, 240)",
        }}
        title="Clientes"
        subTitle="Alta"
        onBack={goBack}
      />
      <Tabs defaultActiveKey="1">
        <TabPane tab="PERFIL" key="1">
          <Form onSubmit={customerRegister}>
            <Row gutter={16}>
              <Col span={6}>
                <Card></Card>
              </Col>
              <Col span={18}>
                <Card>
                  <Form.Item label="Datos de la Empresa">
                    <Row gutter={16}>
                      <Col span={24}>
                        <Input
                          placeholder="Razón social"
                          className="input-form"
                          name="namebusiness"
                          onChange={onChange}
                          value={namebusiness}
                        />
                      </Col>

                      <Col span={8}>
                        <Input
                          placeholder="Alias"
                          className="input-form"
                          name="name"
                          onChange={onChange}
                          value={name}
                        />
                      </Col>
                      <Col span={16}>
                        <Input
                          placeholder="RFC"
                          className="input-form"
                          name="rfc"
                          onChange={onChange}
                          value={rfc}
                        />
                      </Col>
                    </Row>
                  </Form.Item>

                  <Form.Item label="Datos de Contacto">
                    <Row gutter={16}>
                      <Col span={14}>
                        <Input
                          prefix={
                            <MailOutlined
                              style={{ color: "rgba(0,0,0,.25)" }}
                            />
                          }
                          placeholder="Correo electrónico"
                          className="input-form"
                          name="email"
                          onChange={onChange}
                          value={email}
                        />
                      </Col>
                      <Col span={10}>
                        <Input
                          prefix={
                            <GlobalOutlined
                              style={{ color: "rgba(0,0,0,.25)" }}
                            />
                          }
                          placeholder="Web"
                          className="input-form"
                          name="web"
                          onChange={onChange}
                          value={web}
                        />
                      </Col>
                      <Col span={12}>
                        <Input
                          prefix={
                            <PhoneOutlined
                              style={{ color: "rgba(0,0,0,.25)" }}
                            />
                          }
                          type="Number"
                          placeholder="Número de teléfono"
                          className="input-form"
                          name="phone"
                          onChange={onChange}
                          value={phone}
                        />
                      </Col>
                      <Col span={12}>
                        <Input
                          prefix={
                            <PhoneOutlined
                              style={{ color: "rgba(0,0,0,.25)" }}
                            />
                          }
                          type="Number"
                          placeholder="Número de celular"
                          className="input-form"
                          name="cellphone"
                          onChange={onChange}
                          value={cellphone}
                        />
                      </Col>
                    </Row>
                  </Form.Item>

                  <Input
                    prefix={
                      <EnvironmentOutlined
                        style={{ color: "rgba(0,0,0,.25)" }}
                      />
                    }
                    placeholder="Dirección"
                    className="input-form"
                    name="address"
                    onChange={onChange}
                    value={address}
                  />
                  <div
                    style={{
                      right: 0,
                      bottom: 0,
                      width: "100%",
                      borderTop: "1px solid #e9e9e9",
                      padding: "10px 16px",
                      background: "#fff",
                      textAlign: "right",
                    }}
                  >
                    <Button
                      onClick={goBack}
                      size="large"
                      style={{ marginRight: 8 }}
                    >
                      Cancelar
                    </Button>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="login-form-button"
                      size="large"
                      icon={<UserAddOutlined />}
                    >
                      Registrar cliente
                    </Button>
                  </div>
                </Card>
              </Col>
            </Row>
          </Form>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default CustomerCreate;
