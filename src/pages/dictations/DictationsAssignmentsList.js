import React from "react";
import { useQuery, gql } from "@apollo/client";
import XLSX from "xlsx";
import Loading from "../../components/Loading";
import { saveAs } from "file-saver";
import { PageHeader, Table, Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";

const OBTENER_DICTAMENES_ASIGNACION = gql`
  query obtenerDictamenesAsignacion($id: ID!) {
    obtenerDictamenesAsignacion(asignacion: $id) {
      id
      asignacion
      dictamen
      subdictamen
      razon
      folio
      total
      fechapago
      creado
      comentarios
      usuario
    }
  }
`;

const DictationsAssignmentsList = (props) => {
  const { data, loading, error } = useQuery(OBTENER_DICTAMENES_ASIGNACION, {
    variables: {
      id: props.match.params.Id,
    },
  });
  console.log(data);
  console.log(error);

  const columns = [
    {
      title: "Dictamen",
      dataIndex: "dictamen",
      key: "dictamen",
      align: "center",
    },
    {
      title: "Subdictamen",
      dataIndex: "subdictamen",
      key: "subdictamen",
      align: "center",
    },
    {
      title: "Motivo",
      dataIndex: "razon",
      key: "razon",
      align: "center",
    },
    {
      title: "Folio",
      dataIndex: "folio",
      key: "folio",
      align: "center",
    },
    {
      title: "Fecha pago",
      dataIndex: "fechapago",
      key: "date",
      align: "center",
    },
    {
      title: "Monto",
      dataIndex: "total",
      key: "total",
      align: "center",
      render: (text, dictation) =>
        dictation.total ? <span>${dictation.total}</span> : null,
    },
    {
      title: "Comentario",
      dataIndex: "comentarios",
      key: "comentarios",
      align: "center",
    },
    {
      title: "Gestor",
      dataIndex: "usuario",
      key: "usuario",
      align: "center",
    },
  ];

  if (loading) return <Loading />;

  const writeDictationFile = () => {
    let wb = XLSX.utils.table_to_book(document.getElementById("mytable"), {
      sheet: "Dictaminación",
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
      "MisGestiones.xlsx"
    );
  };

  return (
    <div style={{ marginTop: "3px" }}>
      <PageHeader
        style={{
          border: "1px solid rgb(235, 237, 240)",
        }}
        title="Gestiones"
        subTitle="Lista"
        extra={[
          <Button
            key={1}
            onClick={writeDictationFile}
            icon={<DownloadOutlined />}
          >
            Exportar mis gestiones
          </Button>,
        ]}
      />
      <Table
        id="mytable"
        columns={columns}
        dataSource={data.obtenerDictamenesAsignacion}
        rowKey={(record) => record.id}
        style={{ marginTop: "3px" }}
        pagination={{ pageSize: 25 }}
        scroll={{ y: 240 }}
      />
    </div>
  );
};

export default DictationsAssignmentsList;
