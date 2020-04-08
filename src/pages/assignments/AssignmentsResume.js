import React, { useState, useEffect } from "react";
import XLSX from "xlsx";
import { saveAs } from "file-saver";
import { getContacts } from "../../services/firebase";
import { Link, useHistory } from "react-router-dom";
import { PageHeader, Button, Icon, Table } from "antd";

const AssignmentsResume = () => {
  const [contacts, setContacts] = useState([]);
  const history = useHistory();

  const columns = [
    {
      title: "Num Dama",
      dataIndex: "numdama",
      key: "numdama",
      align: "center",
      render: (text, contact) => (
        <Link to={`/gestiones/damas/${contact.id}`}>
          <span>{contact.numdama}</span>
        </Link>
      ),
    },
    {
      title: "Dama",
      dataIndex: "nombre",
      key: "nombre",
      align: "center",
    },
    {
      title: "Dirección",
      dataIndex: "direccion",
      key: "direccion",
      align: "center",
    },
    {
      title: "Teléfonos",
      dataIndex: "telefonocelular",
      key: "telefonocelular",
      align: "center",
    },
    {
      dataIndex: "telefonocasa",
      key: "telefonocasa",
      align: "center",
    },
    {
      title: "Saldo",
      dataIndex: "totalacobrar",
      key: "totalacobrar",
      align: "center",
      render: (text, contact) => <span>${contact.totalacobrar}</span>,
    },
  ];

  const onRegisterAssignmentButton = () => {
    history.push("/asignaciones/nueva");
  };

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

  useEffect(() => {
    const getContactsFirebase = () => {
      getContacts()
        .then((res) => {
          console.log(res);
          setContacts(res);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    getContactsFirebase();
  }, []);

  return (
    <div
      style={{ paddingLeft: "10px", marginTop: "10px", marginRight: "10px" }}
    >
      <PageHeader
        style={{
          border: "1px solid rgb(235, 237, 240)",
        }}
        title="Asignaciones"
        subTitle="Call Center"
        extra={[
          <Button key={2} onClick={writeAssignmentFile}>
            <Icon type="download" /> Exportar asignaciones
          </Button>,
          <Button type="primary" key={1} onClick={onRegisterAssignmentButton}>
            <Icon type="upload" /> Importar asignaciones
          </Button>,
        ]}
      />
      <Table
        id="mytable"
        columns={columns}
        dataSource={contacts}
        style={{ marginTop: "3px" }}
        rowKey={(contacts) => contacts.id}
        pagination={{ pageSize: 25 }}
      />
    </div>
  );
};

export default AssignmentsResume;
