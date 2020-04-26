import React, { useState, useEffect } from "react";
import XLSX from "xlsx";
import { saveAs } from "file-saver";
import { getPays } from "../../services/firebase";
import { Link } from "react-router-dom";
import { PageHeader, Table, Button, Upload, message } from "antd";
import { DownloadOutlined, UploadOutlined } from "@ant-design/icons";

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
      render: (text, pay) => (
        <Link to={`/pagos/${pay.id}`}>
          <span>
            {pay.name} {pay.number}
          </span>
        </Link>
      ),
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

  const writePaysFile = () => {
    let wb = XLSX.utils.table_to_book(document.getElementById("mytable"), {
      sheet: "Pagos",
    });
    let wbout = XLSX.write(wb, {
      bookType: "xlsx",
      type: "binary",
      bookSST: true,
    });
    const s2ab = (s) => {
      let buf = new ArrayBuffer(s.length);
      let view = new Uint8Array(buf);
      for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff;
      return buf;
    };
    saveAs(
      new Blob([s2ab(wbout)], { type: "application/octet-stream" }),
      "Pagos.xlsx"
    );
  };

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

  const props = {
    name: "file",
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} documento cargado exitosamente`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} la carga del archivo falló.`);
      }
    },
  };

  return (
    <div
      style={{ paddingLeft: "10px", marginTop: "10px", marginRight: "10px" }}
    >
      <PageHeader
        style={{
          border: "1px solid rgb(235, 237, 240)",
        }}
        title="Pagos Realizados"
        subTitle="Lista"
        extra={[
          <Button key={2} onClick={writePaysFile} icon={<DownloadOutlined />}>
            Exportar pagos
          </Button>,
          <Upload {...props}>
            <Button type="primary" key={1} icon={<UploadOutlined />}>
              Importar pagos
            </Button>
          </Upload>,
        ]}
      />
      <Table
        id="mytable"
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
