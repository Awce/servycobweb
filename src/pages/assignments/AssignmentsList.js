import React from "react";
import { useQuery, gql } from "@apollo/client";
import XLSX from "xlsx";
import Loading from "../../components/Loading";
import { saveAs } from "file-saver";
import { Link } from "react-router-dom";
import { PageHeader, Button, Table } from "antd";
import { DownloadOutlined } from "@ant-design/icons";

const OBTENER_ASIGNACIONES = gql`
  query obtenerAsignaciones {
    obtenerAsignaciones {
      id
      campanaventa
      ruta
      numerozonafacturacion
      liquidacion
      numdama
      digitodama
      nombre
      direccion
      colonia
      poblacion
      estado
      codigopostal
      referencia
      telefonocasa
      telefonocelular
      totalacobrar
      aniocampaniasaldo
      campanasvencidas
      cau
      idsituacion
      descsituacion
      idsituacioncie
      descsituacioncie
      tipocartera
      cierre
      usuario
      creado
    }
  }
`;

const AssignmentsList = () => {
  const { data, loading, error } = useQuery(OBTENER_ASIGNACIONES);
  console.log(data);
  console.log(error);

  const columns = [
    {
      title: "Dama",
      dataIndex: "numdama",
      key: "numdama",
      align: "center",
      render: (text, contact) => (
        <Link to={`/asignaciones/damas/${contact.id}`}>
          <span>{contact.numdama}</span>
        </Link>
      ),
    },
    {
      title: "Dígito",
      dataIndex: "digitodama",
      key: "digitodama",
      align: "center",
    },
    {
      title: "Nombre",
      dataIndex: "nombre",
      key: "nombre",
      align: "center",
    },
    {
      title: "Dirección",
      dataIndex: "direccion",
      key: "direccion",
      align: "center",
      ellipsis: true,
    },
    {
      title: "Teléfono Celular",
      dataIndex: "telefonocelular",
      key: "telefonocelular",
      align: "center",
    },
    {
      title: "Teléfono Casa",
      dataIndex: "telefonocasa",
      key: "telefonocasa",
      align: "center",
    },
    {
      title: "Total a Cobrar",
      dataIndex: "totalacobrar",
      key: "totalacobrar",
      align: "center",
      render: (text, contact) => <span>${contact.totalacobrar}</span>,
    },
  ];

  if (loading) return <Loading />;

  const writeAssignmentFile = () => {
    let wb = XLSX.utils.table_to_book(document.getElementById("mytable"), {
      sheet: "Assignaciones",
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
      "Assignaciones.xlsx"
    );
  };

  return (
    <>
      <PageHeader
        ghost={false}
        style={{
          border: "1px solid rgb(235, 237, 240)",
        }}
        title="Asignaciones"
        subTitle="Lista"
        extra={[
          <Button
            key={1}
            onClick={writeAssignmentFile}
            icon={<DownloadOutlined />}
          >
            Exportar asignaciones
          </Button>,
        ]}
      />

      <Table
        id="mytable"
        columns={columns}
        dataSource={data.obtenerAsignaciones}
        style={{ marginTop: "3px" }}
        rowKey={(record) => record.id}
        pagination={{ pageSize: 15 }}
        scroll={{ y: 240 }}
      />
    </>
  );
};

export default AssignmentsList;
