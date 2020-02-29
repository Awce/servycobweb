import React, { useState, useEffect } from "react";
import { getContacts } from "../../services/firebase";
import { Link } from "react-router-dom";
import { PageHeader, Table } from "antd";

const AssignmentsList = () => {
  const [contacts, setContacts] = useState([]);

  const columns = [
    {
      title: "ID",
      dataIndex: "idcontact",
      key: "idcontact",
      align: "center"
    },
    {
      title: "Dama",
      dataIndex: "name",
      key: "name",
      align: "center",
      render: (text, contact) => (
        <Link to={`/calls/contacts/${contact.id}`}>
          <span>{contact.name}</span>
        </Link>
      )
    },
    {
      title: "Dirección",
      dataIndex: "address",
      key: "address",
      align: "center"
    },
    {
      title: "Teléfono",
      dataIndex: "cellphone",
      key: "cellphone",
      align: "center"
    },
    {
      title: "Correo",
      dataIndex: "email",
      key: "email",
      align: "center"
    },
    {
      title: "Saldo",
      dataIndex: "balance",
      key: "balance",
      align: "center",
      render: (text, contact) => <span>${contact.balance}.00</span>
    }
  ];

  useEffect(() => {
    const getContactsFirebase = () => {
      getContacts()
        .then(res => {
          console.log(res);
          setContacts(res);
        })
        .catch(e => {
          console.log(e);
        });
    };
    getContactsFirebase();
  }, []);

  return (
    <div
      style={{ paddingLeft: "20px", marginTop: "10px", marginRight: "20px" }}
    >
      <PageHeader
        style={{
          border: "1px solid rgb(235, 237, 240)"
        }}
        title="Asignaciones"
        subTitle="Call Center"
      />
      <Table
        columns={columns}
        dataSource={contacts}
        rowKey={contacts => contacts.id}
      />
    </div>
  );
};

export default AssignmentsList;
