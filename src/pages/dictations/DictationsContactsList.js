import React from "react";
import { useQuery, gql } from "@apollo/client";
import XLSX from "xlsx";
import Loading from "../../components/Loading";
import { saveAs } from "file-saver";
import { PageHeader, Table, Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";

const OBTENER_DICTAMENES_DAMA = gql`
  query obtenerDictamenDama($id: ID) {
    obtenerDictamenDama(id: $id) {
      id
      dictamen
      subdictamen
      razon
      folio
      monto
      fechapago
      comentarios
      usuario
      dama
    }
  }
`;

const DictationsList = (props) => {
  const { data, loading, error } = useQuery(OBTENER_DICTAMENES_DAMA, {
    variables: {
      id: "5ec34567a7d1ed0f44cb5c75",
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
      dataIndex: "monto",
      key: "monto",
      align: "center",
      render: (text, dictation) =>
        dictation.monto ? <span>${dictation.monto}</span> : null,
    },
    {
      title: "Comentario",
      dataIndex: "comentarios",
      key: "comentarios",
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
      "Historial de Dictaminación.xlsx"
    );
  };

  return (
    <div style={{ marginTop: "3px" }}>
      <PageHeader
        style={{
          border: "1px solid rgb(235, 237, 240)",
        }}
        title="Historial de Dictaminación"
        subTitle="Lista"
        extra={[
          <Button
            key={1}
            onClick={writeDictationFile}
            icon={<DownloadOutlined />}
          >
            Exportar dictaminación
          </Button>,
        ]}
      />
      <Table
        id="mytable"
        columns={columns}
        dataSource={data.obtenerDictamenDama}
        //rowKey={(dictations) => dictations.id}
        style={{ marginTop: "3px" }}
        pagination={{ pageSize: 25 }}
        scroll={{ y: 240 }}
      />
    </div>
  );
};

export default DictationsList;
