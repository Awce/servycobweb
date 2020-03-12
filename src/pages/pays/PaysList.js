import React, { useState, useEffect } from "react";
import { getPays } from "../../services/firebase";
import { Link } from "react-router-dom";
import { PageHeader, Table } from "antd";

const PaysList = () => {
  const [pays, setPays] = useState([]);

  const columns = [
    {
      title: "Fecha de entrega",
      dataIndex: "delivery_date",
      key: "delivery_date",
      align: "center"
    },
    {
      title: "Número Dama",
      dataIndex: "number",
      key: "number",
      align: "center",
      render: (text, pay) => (
        <Link to={`/pays/${pay.id}`}>
          <span>
            {pay.name} {pay.number}
          </span>
        </Link>
      )
    },
    {
      title: "Año campaña saldo",
      dataIndex: "yearcampaign",
      key: "yearcampaign",
      align: "center"
    },
    {
      title: "Fecha",
      dataIndex: "date",
      key: "date",
      align: "center"
    },
    {
      title: "Saldo anterior",
      dataIndex: "amount",
      key: "amount",
      align: "center",
      render: (text, pay) => <span>${pay.amount}.00</span>
    },
    {
      title: "Pago",
      dataIndex: "pay",
      key: "pay",
      align: "center",
      render: (text, pay) => <span>${pay.pay}.00</span>
    },
    {
      title: "Saldo actual",
      dataIndex: "balance",
      key: "balance",
      align: "center",
      render: (text, pay) => <span>${pay.balance}.00</span>
    },
    {
      title: "Tipo de pago",
      dataIndex: "type",
      key: "type",
      align: "center"
    }
  ];

  useEffect(() => {
    const getPaysFirebase = () => {
      getPays()
        .then(res => {
          console.log(res);
          setPays(res);
        })
        .catch(e => {
          console.log(e);
        });
    };
    getPaysFirebase();
  }, []);

  return (
    <div
      style={{ paddingLeft: "20px", marginTop: "10px", marginRight: "20px" }}
    >
      <PageHeader
        style={{
          border: "1px solid rgb(235, 237, 240)"
        }}
        title="Pagos"
        subTitle="Lista"
        // extra={[<RegisterUserButton key="1" />]}
      />
      <Table
        columns={columns}
        dataSource={pays}
        rowKey={pays => pays.id}
        style={{ marginTop: "3px" }}
        pagination={{ pageSize: 25 }}
      />
    </div>
  );
};

export default PaysList;
