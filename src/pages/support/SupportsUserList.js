import React from "react";
import { useQuery, gql } from "@apollo/client";
import Loading from "../../components/Loading";
import { saveAs } from "file-saver";
import XLSX from "xlsx";
import { Link, useHistory } from "react-router-dom";
import { PageHeader, Button, Table } from "antd";
import { CustomerServiceOutlined, DownloadOutlined } from "@ant-design/icons";
import moment from "moment";

const OBTENER_MIS_SOPORTES = gql`
  query obtenerSoportesUsuario {
    obtenerSoportesUsuario {
      id
      nombre
      email
      telefono
      modelo
      ubicacion
      motivollamada
      otromotivo
      producto
      categoria
      motivo
      causa
      comentarios
      dictamen
      otrodictamen
      usuario
      creado
    }
  }
`;

const SupportsUserList = () => {
  const { data, loading, error } = useQuery(OBTENER_MIS_SOPORTES);

  console.log(error);

  const history = useHistory();

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      align: "center",
      ellipsis: true,
    },
    {
      title: "Nombre",
      dataIndex: "nombre",
      key: "nombre",
      align: "center",
      render: (text, support) => (
        <Link to={`/soporte/${support.id}`}>
          <span>{support.nombre}</span>
        </Link>
      ),
      ellipsis: true,
    },
    {
      title: "Correo",
      dataIndex: "email",
      key: "email",
      align: "center",
    },
    {
      title: "Teléfono",
      dataIndex: "telefono",
      key: "telefono",
      align: "center",
    },
    {
      title: "Modelo",
      dataIndex: "modelo",
      key: "modelo",
      align: "center",
      ellipsis: true,
    },
    {
      title: "Ubicación",
      dataIndex: "ubicacion",
      key: "ubicacion",
      align: "center",
      ellipsis: true,
    },
    {
      title: "Fecha y Hora",
      dataIndex: "creado",
      key: "creado",
      align: "center",
      render: (text, support) =>
        moment(Number(support.creado)).format("DD MM YYYY h:mm A"),
    },
    {
      title: "Motivo Llamada",
      dataIndex: "motivollamada",
      key: "motivollamada",
      align: "center",
      ellipsis: true,
    },
    {
      title: "Otro",
      dataIndex: "otromotivo",
      key: "otromotivo",
      align: "center",
      ellipsis: true,
    },
    {
      title: "Producto",
      dataIndex: "producto",
      key: "producto",
      align: "center",
    },
    {
      title: "Categoría",
      dataIndex: "categoria",
      key: "categoria",
      align: "center",
    },
    {
      title: "Motivo",
      dataIndex: "motivo",
      key: "motivo",
      align: "center",
      ellipsis: true,
    },
    {
      title: "Causa",
      dataIndex: "causa",
      key: "causa",
      align: "center",
      ellipsis: true,
    },
    {
      title: "Comentarios",
      dataIndex: "comentarios",
      key: "comentarios",
      align: "center",
      ellipsis: true,
    },
    {
      title: "Dictamen",
      dataIndex: "dictamen",
      key: "dictamen",
      align: "center",
    },
    {
      title: "Otro",
      dataIndex: "otrodictamen",
      key: "otrodictamen",
      align: "center",
      ellipsis: true,
    },
  ];

  if (loading) return <Loading />;

  const onRegisterSupportButton = () => {
    history.push("/soporte/nuevo");
  };

  const writeSupportFile = () => {
    let wb = XLSX.utils.table_to_book(document.getElementById("mytable"), {
      sheet: "Soporte",
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
      "MisSoportes.xlsx"
    );
  };

  return (
    <div
      style={{ paddingLeft: "10px", marginTop: "10px", marginRight: "10px" }}
    >
      <PageHeader
        style={{
          border: "1px solid rgb(235, 237, 240)",
        }}
        title="Mi Soporte"
        subTitle="Lista"
        extra={[
          <Button
            key={1}
            onClick={writeSupportFile}
            icon={<DownloadOutlined />}
          >
            Exportar mis soportes
          </Button>,
          <Button
            type="primary"
            key={2}
            onClick={onRegisterSupportButton}
            icon={<CustomerServiceOutlined />}
          >
            Crear un ticket
          </Button>,
        ]}
      />
      <div style={{ marginTop: "3px" }}>
        <Table
          id="mytable"
          columns={columns}
          dataSource={data.obtenerSoportesUsuario}
          rowKey={(record) => record.id}
          style={{ marginTop: "3px" }}
          pagination={{ pageSize: 100 }}
          scroll={{ y: 640 }}
          bordered
        />
      </div>
    </div>
  );
};

export default SupportsUserList;
