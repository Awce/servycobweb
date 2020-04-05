import React, { useState, useEffect } from "react";
import { getContacts } from "../../services/firebase";
import { Link } from "react-router-dom";
import { PageHeader, Table } from "antd";

const AssignmentsList = () => {
  const [contacts, setContacts] = useState([]);

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
        title="Mis Asignaciones"
        subTitle="Call Center"
      />
      <Table
        columns={columns}
        dataSource={contacts}
        style={{ marginTop: "3px" }}
        rowKey={(contacts) => contacts.id}
        pagination={{ pageSize: 25 }}
      />
    </div>
  );
};

export default AssignmentsList;
