import React, { useState, useEffect } from "react";
import { getPays } from "../../services/firebase";
import { PageHeader, Table, Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";

const PaysList = () => {
  const [pays, setPays] = useState([]);

  const columns = [
    {
      title: "Fecha de entrega",
      dataIndex: "delivery_date",
      key: "delivery_date",
      align: "center",
    },
    {
      title: "Número Dama",
      dataIndex: "number",
      key: "number",
      align: "center",
    },
    {
      title: "Cliente",
      dataIndex: "customer",
      key: "customer",
      align: "center",
    },
    {
      title: "Año campaña saldo",
      dataIndex: "yearcampaign",
      key: "yearcampaign",
      align: "center",
    },
    {
      title: "Fecha",
      dataIndex: "date",
      key: "date",
      align: "center",
    },
    {
      title: "Saldo anterior",
      dataIndex: "amount",
      key: "amount",
      align: "center",
      render: (text, pay) => <span>${pay.amount}.00</span>,
    },
    {
      title: "Pago",
      dataIndex: "pay",
      key: "pay",
      align: "center",
      render: (text, pay) => <span>${pay.pay}.00</span>,
    },
    {
      title: "Saldo actual",
      dataIndex: "balance",
      key: "balance",
      align: "center",
      render: (text, pay) => <span>${pay.balance}.00</span>,
    },
    {
      title: "Tipo de pago",
      dataIndex: "type",
      key: "type",
      align: "center",
    },
  ];

  useEffect(() => {
    const getPaysFirebase = () => {
      getPays()
        .then((res) => {
          console.log(res);
          setPays(res);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    getPaysFirebase();
  }, []);

  return (
    <div style={{ marginTop: "3px" }}>
      <PageHeader
        style={{
          border: "1px solid rgb(235, 237, 240)",
        }}
        title="Pagos realizados"
        subTitle="Lista"
        extra={[
          <Button key="1" icon={<DownloadOutlined />}>
            Exportar pagos
          </Button>,
        ]}
      />
      <Table
        columns={columns}
        dataSource={pays}
        rowKey={(pays) => pays.id}
        style={{ marginTop: "3px" }}
        pagination={{ pageSize: 25 }}
      />
    </div>
  );
};

export default PaysList;
