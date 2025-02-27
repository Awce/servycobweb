import React from "react";
import { useQuery, gql } from "@apollo/client";
import XLSX from "xlsx";
import Loading from "../../components/Loading";
import { saveAs } from "file-saver";
import { PageHeader, Table, Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";

const OBTENER_DICTAMENES = gql`
  query obtenerDictamenes {
    obtenerDictamenes {
      id
      numdama
      digitodama
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

const DictationsList = () => {
  const { data, loading, error } = useQuery(OBTENER_DICTAMENES);
  console.log(data);
  console.log(error);

  const columns = [
    {
      title: "Dama",
      dataIndex: "numdama",
      key: "numdama",
      align: "center",
    },
    {
      title: "Dígito",
      dataIndex: "digitodama",
      key: "digitodama",
      align: "center",
    },
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
      "Dictaminacion.xlsx"
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
        title="Historial de Dictaminación"
        subTitle="Lista"
        extra={[
          <Button
            key={1}
            onClick={writeDictationFile}
            icon={<DownloadOutlined />}
          >
            Exportar Dictaminación
          </Button>,
        ]}
      />
      <Table
        id="mytable"
        columns={columns}
        dataSource={data.obtenerDictamenes}
        rowKey={(record) => record.id}
        style={{ marginTop: "3px" }}
        pagination={{ pageSize: 25 }}
        scroll={{ y: 240 }}
      />
    </div>
  );
};

export default DictationsList;
