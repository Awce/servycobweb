import React, { useState } from "react";
import { Cascader, Form } from "antd";
import { Link } from "react-router-dom";

const useDictation = () => {
  const DictationsOptions = [
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

  function handleChange(value) {
    console.log(`Valor seleccionado: ${value}`);
  }

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
            <Link onClick={e => handleAreaClick(e, label, option)}>
              {option.code}
            </Link>
            )
          </span>
        );
      }
      return <span key={option.value}>{label} / </span>;
    });

  const [state, refreshState] = useState("");

  const SelectDictation = () => (
    <Form>
      <Form.Item label="Dictamen / SubDictamen / Motivo :">
        <Cascader
          size="large"
          options={DictationsOptions}
          placeholder="Selecciona el árbol de dictamen"
          onChange={handleChange}
          displayRender={displayRender}
          allowClear
        />
      </Form.Item>
    </Form>
  );

  return [state, SelectDictation, refreshState];
};

export default useDictation;
