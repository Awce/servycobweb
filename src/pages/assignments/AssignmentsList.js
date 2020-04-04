import React, { useState, useEffect } from "react";
import { getContacts } from "../../services/firebase";
import { Link } from "react-router-dom";
import { PageHeader, Table, Input } from "antd";

const { Search } = Input;

const AssignmentsList = () => {
  const [contacts, setContacts] = useState([]);

  const columns = [
    {
      title: "ID",
      dataIndex: "idcontact",
      key: "idcontact",
      align: "center",
      render: (text, contact) => (
        <Link to={`/gestiones/damas/${contact.id}`}>
          <span>{contact.idcontact}</span>
        </Link>
      )
    },
    {
      title: "Dama",
      dataIndex: "name",
      key: "name",
      align: "center"
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
      render: (text, contact) => <span>${contact.balance}</span>
    }
  ];

  const searchValue = value => {
    console.log(value);
  };

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
      style={{ paddingLeft: "10px", marginTop: "10px", marginRight: "10px" }}
    >
      <PageHeader
        style={{
          border: "1px solid rgb(235, 237, 240)"
        }}
        title="Mis Asignaciones"
        subTitle="Call Center"
        extra={[
          <Search
            onSearch={searchValue}
            key={1}
            style={{ width: 200 }}
            placeholder="Buscar..."
          />
        ]}
      />
      <Table
        columns={columns}
        dataSource={contacts}
        style={{ marginTop: "3px" }}
        rowKey={contacts => contacts.id}
        pagination={{ pageSize: 25 }}
      />
    </div>
  );
};

export default AssignmentsList;
