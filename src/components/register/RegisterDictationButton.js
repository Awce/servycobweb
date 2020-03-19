import React, { useState } from "react";
import {
  Drawer,
  Button,
  Icon,
  Cascader,
  Form,
  Input,
  Col,
  Row,
  message
} from "antd";
import { createDictation } from "../../services/firebase";

const { TextArea } = Input;
const InputGroup = Input.Group;
const key = "updatable";

export const DictationsOptions = [
  {
    value: "Telefonico",
    label: "Telefonico",
    children: [
      {
        value: "Contacto Directo",
        label: "Contacto Directo",
        children: [
          {
            value: "Negativa de Pago",
            label: "Negativa de Pago",
            code: 2
          },
          {
            value: "Cobrada por GDC o Consejera",
            label: "Cobrada por GDC o Consejera",
            code: 3
          },
          {
            value: "Doble Nombramiento o Saldo",
            label: "Doble Nombramiento o Saldo",
            code: 5
          },
          {
            value: "Reclamación de Premio",
            label: "Reclamación de Premio",
            code: 6
          },
          {
            value: "Promesa de Pago",
            label: "Promesa de Pago",
            code: 7
          },
          {
            value: "Caja Devuelta a GDV",
            label: "Caja Devuelta a GDV",
            code: 8
          },
          {
            value: "Pago a Porteador",
            label: "Pago a Porteador",
            code: 9
          },
          {
            value: "Producto devuelto a GDC",
            label: "Producto devuelto a GDC",
            code: 10
          },
          {
            value: "Contratación Menor de Edad",
            label: "Contratación Menor de Edad",
            code: 11
          },
          {
            value: "Pedido NO Entregado",
            label: "Pedido NO Entregado",
            code: 12
          },
          {
            value: "Ajuste Pendiente",
            label: "Ajuste Pendiente",
            code: 13
          },
          {
            value: "Pedido NO solicitado por Dama",
            label: "Pedido NO solicitado por Dama",
            code: 14
          },
          {
            value: "Dama NO Recibio Producto",
            label: "Dama NO Recibio Producto",
            code: 15
          },
          {
            value: "Pago a Cobrador",
            label: "Pago a Cobrador",
            code: 23
          },
          {
            value: "Pedidos Multiples",
            label: "Pedidos Multiples",
            code: 26
          },
          {
            value: "Ya pago",
            label: "Ya pago",
            code: 34
          },
          {
            value: "Promesa Incumplida",
            label: "Promesa Incumplida",
            code: 35
          },
          {
            value: "Seguimiento a Promesa de Pago",
            label: "Seguimiento a Promesa de Pago",
            code: 36
          },
          {
            value: "Negociando",
            label: "Negociando",
            code: 37
          }
        ]
      },
      {
        value: "Contacto Indirecto",
        label: "Contacto Indirecto",
        children: [
          {
            value: "Se Notifica del saldo a Terceros",
            label: "Se Notifica del saldo a Terceros",
            code: 20
          },
          {
            value: "Defuncion Dama",
            label: "Defuncion Dama",
            code: 24
          },
          {
            value: "Domicilio-Tel. de GDC o concejera",
            label: "Domicilio-Tel. de GDC o concejera",
            code: 25
          },
          {
            value: "Cuelgan llamada",
            label: "Cuelgan llamada",
            code: 27
          }
        ]
      },
      {
        value: "Sin Contacto",
        label: "Sin Contacto",
        children: [
          {
            value: "Pedidos Multiples",
            label: "Pedidos Multiples",
            code: 26
          },
          {
            value: "No contestan",
            label: "No contestan",
            code: 28
          },
          {
            value: "Fuera de servicio",
            label: "Fuera de servicio",
            code: 29
          },
          {
            value: "Ocupado",
            label: "Ocupado",
            code: 31
          }
        ]
      },
      {
        value: "Ilocalizable",
        label: "Ilocalizable",
        children: [
          {
            value: "Cambio de Domicilio",
            label: "Cambio de Domicilio",
            code: 1
          },
          {
            value: "No conocen a Consejera, No Vive ahí",
            label: "No conocen a Consejera, No Vive ahí",
            code: 22
          },
          {
            value: "No existe",
            label: "No existe",
            code: 32
          },
          {
            value: "Sin Datos Telefonicos",
            label: "Sin Datos Telefonicos",
            code: 34
          },
          {
            value: "Telefono incompleto",
            label: "Telefono incompleto",
            code: 35
          }
        ]
      }
    ]
  },
  {
    value: "Domiciliar",
    label: "Domiciliar",
    children: [
      {
        value: "Domiciliar",
        label: "Domiciliar",
        children: [
          {
            value: "Nueva-Inactividad",
            label: "Nueva-Inactividad",
            code: 0
          },
          {
            value: "Cambio de Domicilio",
            label: "Cambio de Domicilio",
            code: 1
          },
          {
            value: "Negativa de Pago",
            label: "Negativa de Pago",
            code: 2
          },
          {
            value: "Cobrada por GDC o Consejera",
            label: "Cobrada por GDC o Consejera",
            code: 3
          },
          {
            value: "Domicilio no Localizado",
            label: "Domicilio no Localizado",
            code: 4
          },
          {
            value: "Doble Nombramiento o Saldo",
            label: "Doble Nombramiento o Saldo",
            code: 5
          },
          {
            value: "Reclamación de Premio",
            label: "Reclamación de Premio",
            code: 6
          },
          {
            value: "Promesa de Pago",
            label: "Promesa de Pago",
            code: 7
          },
          {
            value: "Caja Devuelta a GDV",
            label: "Caja Devuelta a GDV",
            code: 8
          },
          {
            value: "Pago a Porteador",
            label: "Pago a Porteador",
            code: 9
          },
          {
            value: "Producto devuelto a GDC",
            label: "Producto devuelto a GDC",
            code: 10
          },
          {
            value: "Contratación Menor de Edad",
            label: "Contratación Menor de Edad",
            code: 11
          },
          {
            value: "Pedido NO Entregado",
            label: "Pedido NO Entregado",
            code: 12
          },
          {
            value: "Pedido NO solicitado por Dama",
            label: "Pedido NO solicitado por Dama",
            code: 14
          },
          {
            value: "Dama NO Recibio Producto",
            label: "Dama NO Recibio Producto",
            code: 15
          },
          {
            value: "Pdcto. A dev x Dama, pend. X rec.",
            label: "Pdcto. A dev x Dama, pend. X rec.",
            code: 16
          },
          {
            value: "Dama fuera de zona",
            label: "Dama fuera de zona",
            code: 18
          },
          {
            value: "Dama NO Gestionada - Visitada",
            label: "Dama NO Gestionada - Visitada",
            code: 19
          },
          {
            value: "Se Notifica del saldo a Terceros",
            label: "Se Notifica del saldo a Terceros",
            code: 20
          },
          {
            value: "Casa Vacía o Lote Baldío",
            label: "Casa Vacía o Lote Baldío",
            code: 21
          },
          {
            value: "No conocen a Consejera, No Vive ahí",
            label: "No conocen a Consejera, No Vive ahí",
            code: 22
          },
          {
            value: "Pago a Cobrador",
            label: "Pago a Cobrador",
            code: 23
          },
          {
            value: "Defuncion Dama",
            label: "Defuncion Dama",
            code: 24
          },
          {
            value: "Domicilio-Tel. de GDC o concejera",
            label: "Domicilio-Tel. de GDC o concejera",
            code: 25
          },
          {
            value: "Pedidos Multiples",
            label: "Pedidos Multiples",
            code: 26
          }
        ]
      }
    ]
  }
];

const RegisterDictationButton = () => {
  const [dictationsTree, setDictationsTree] = useState([]);
  const [dictationsValues, setDictationsValues] = useState({
    amount: "",
    date: "",
    serial: "",
    comment: "",
    dictation: "",
    subdictation: "",
    reason: ""
  });

  const [error, setError] = useState(false);

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
    setDictationsValues({
      amount: "",
      date: "",
      serial: "",
      comment: ""
    });
  };

  const { visible } = show;

  function handleAreaClick(e, label, option) {
    e.stopPropagation();
    console.log("clicked", label, option);
  }

  const displayRender = (labels, selectedOptions) =>
    labels.map((label, i) => {
      const option = selectedOptions[i];
      if (i === labels.length - 1) {
        return (
          <span key={option.value}>
            {label} (
            <a
              href={option.code}
              onClick={e => handleAreaClick(e, label, option)}
            >
              {option.code}
            </a>
            )
          </span>
        );
      }
      return <span key={option.value}>{label} / </span>;
    });

  const onChangeDictatons = e => {
    setDictationsValues({
      ...dictationsValues,
      [e.target.name]: e.target.value
    });
  };

  const onChangeTree = value => {
    setDictationsTree([...dictationsTree, value]);
    setDictationsValues({
      ...dictationsValues,
      dictation: value[0],
      subdictation: value[1],
      reason: value[2]
    });
  };

  const dictationRegister = e => {
    e.preventDefault();
    if (
      dictationsValues.dictation.trim() === "" ||
      dictationsValues.subdictation.trim() === "" ||
      dictationsValues.reason.trim() === ""
    ) {
      setError(true);
      message.loading({ content: "Dictaminando...", key });
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
    createDictation(dictationsValues)
      .then(() => {
        onClose();
        message.loading({ content: "Dictaminando...", key });
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

  const { amount, date, serial, comment, reason } = dictationsValues;

  return (
    <div>
      <Button type="primary" onClick={showDrawer}>
        <Icon type="file-add" /> Agregar
      </Button>
      <Drawer
        title="Crear nueva dictaminación"
        width={720}
        bodyStyle={{ paddingBottom: 80 }}
        onClose={onClose}
        visible={visible}
      >
        <Form onSubmit={dictationRegister}>
          <Form.Item label="Dictamen / Subdictamen / Motivo">
            <Cascader
              size="large"
              options={DictationsOptions}
              placeholder="Selecciona el árbol de dictamen"
              displayRender={displayRender}
              onChange={onChangeTree}
              allowClear
            />
          </Form.Item>
          {reason === "Promesa de Pago" && (
            <>
              <Form.Item label="Fecha y Monto de pago">
                <InputGroup size="large">
                  <Row gutter={8}>
                    <Col span={8}>
                      <Input
                        type="date"
                        style={{ width: "100%" }}
                        name="date"
                        value={date}
                        onChange={onChangeDictatons}
                      />
                    </Col>
                    <Col span={8}>
                      <Input
                        type="number"
                        size="large"
                        style={{ width: "100%" }}
                        placeholder="Ingresa el Monto"
                        name="amount"
                        value={amount}
                        formatter={amount =>
                          `$ ${amount}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        }
                        parser={amount => amount.replace(/\$\s?|(,*)/g, "")}
                        onChange={onChangeDictatons}
                      />
                    </Col>
                  </Row>
                </InputGroup>
              </Form.Item>
            </>
          )}

          {reason === "Cobrada por GDC o Consejera" && (
            <>
              <Form.Item label="Fecha y Monto de pago">
                <InputGroup size="large">
                  <Row gutter={8}>
                    <Col span={8}>
                      <Input
                        type="date"
                        style={{ width: "100%" }}
                        name="date"
                        value={date}
                        onChange={onChangeDictatons}
                      />
                    </Col>
                    <Col span={8}>
                      <Input
                        type="number"
                        size="large"
                        style={{ width: "100%" }}
                        placeholder="Ingresa el Monto"
                        name="amount"
                        value={amount}
                        formatter={amount =>
                          `$ ${amount}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        }
                        parser={amount => amount.replace(/\$\s?|(,*)/g, "")}
                        onChange={onChangeDictatons}
                      />
                    </Col>
                  </Row>
                </InputGroup>
              </Form.Item>
            </>
          )}

          {reason === "Pago a Porteador" && (
            <>
              <Form.Item label="Fecha y Monto de pago">
                <InputGroup size="large">
                  <Row gutter={8}>
                    <Col span={8}>
                      <Input
                        type="date"
                        style={{ width: "100%" }}
                        name="date"
                        value={date}
                        onChange={onChangeDictatons}
                      />
                    </Col>
                    <Col span={8}>
                      <Input
                        type="number"
                        size="large"
                        style={{ width: "100%" }}
                        placeholder="Ingresa el Monto"
                        name="amount"
                        value={amount}
                        formatter={amount =>
                          `$ ${amount}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        }
                        parser={amount => amount.replace(/\$\s?|(,*)/g, "")}
                        onChange={onChangeDictatons}
                      />
                    </Col>
                  </Row>
                </InputGroup>
              </Form.Item>
            </>
          )}

          {reason === "Ya pago" && (
            <>
              <Form.Item label="Fecha y Monto de pago">
                <InputGroup size="large">
                  <Row gutter={8}>
                    <Col span={8}>
                      <Input
                        type="date"
                        style={{ width: "100%" }}
                        name="date"
                        value={date}
                        onChange={onChangeDictatons}
                      />
                    </Col>
                    <Col span={8}>
                      <Input
                        type="number"
                        size="large"
                        style={{ width: "100%" }}
                        placeholder="Ingresa el Monto"
                        name="amount"
                        value={amount}
                        formatter={amount =>
                          `$ ${amount}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        }
                        parser={amount => amount.replace(/\$\s?|(,*)/g, "")}
                        onChange={onChangeDictatons}
                      />
                    </Col>
                  </Row>
                </InputGroup>
              </Form.Item>
            </>
          )}

          {reason === "Pago a Cobrador" && (
            <>
              <Form.Item label="Fecha, Monto de pago y Folio de recibo">
                <InputGroup size="large">
                  <Row gutter={8}>
                    <Col span={8}>
                      <Input
                        type="date"
                        style={{ width: "100%" }}
                        name="date"
                        value={date}
                        onChange={onChangeDictatons}
                      />
                    </Col>
                    <Col span={8}>
                      <Input
                        type="number"
                        size="large"
                        style={{ width: "100%" }}
                        placeholder="Ingresa el Monto"
                        name="amount"
                        value={amount}
                        formatter={amount =>
                          `$ ${amount}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        }
                        parser={amount => amount.replace(/\$\s?|(,*)/g, "")}
                        onChange={onChangeDictatons}
                      />
                    </Col>
                    <Col span={8}>
                      <Input
                        type="number"
                        size="large"
                        placeholder="Folio"
                        name="serial"
                        value={serial}
                        onChange={onChangeDictatons}
                      />
                    </Col>
                  </Row>
                </InputGroup>
              </Form.Item>
            </>
          )}

          <Form.Item label="Nota de seguimiento">
            <TextArea
              type="text"
              rows={4}
              placeholder="Agrega un comentario"
              name="comment"
              value={comment}
              onChange={onChangeDictatons}
            />
          </Form.Item>
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
            <Button size="large" style={{ marginRight: 8 }} onClick={onClose}>
              Cancelar
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              size="large"
            >
              Dictaminar
            </Button>
          </div>
        </Form>
      </Drawer>
    </div>
  );
};

export default RegisterDictationButton;
