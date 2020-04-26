import React, { useState, useEffect } from "react";
import { getDictations } from "../../services/firebase";
import { PageHeader, Table, Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";

const DictationsList = () => {
  const [dictations, setDictations] = useState([]);

  const columns = [
    {
      title: "Dictaminación",
      dataIndex: "dictation",
      key: "dictation",
      align: "center",
    },
  ];

  useEffect(() => {
    const getDictationsFirebase = () => {
      getDictations()
        .then((res) => {
          console.log(res);
          setDictations(res);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    getDictationsFirebase();
  }, []);

  return (
    <div style={{ marginTop: "3px" }}>
      <PageHeader
        style={{
          border: "1px solid rgb(235, 237, 240)",
        }}
        title="Historial de Dictaminación"
        subTitle="Lista"
        extra={[
          <Button key="1" icon={<DownloadOutlined />}>
            Exportar dictaminación
          </Button>,
        ]}
      />
      <Table
        columns={columns}
        dataSource={dictations}
        rowKey={(dictations) => dictations.id}
        style={{ marginTop: "3px" }}
        pagination={{ pageSize: 25 }}
      />
    </div>
  );
};

export default DictationsList;
