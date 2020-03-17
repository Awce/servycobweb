import React, { useState, useEffect } from "react";
import { getContacts } from "../../services/firebase";
import { PageHeader, Table, Button, Icon, Upload, message } from "antd";

const AssignmentsUpload = () => {
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

  const props = {
    name: "file",
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    headers: {
      authorization: "authorization-text"
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} documento cargado exitosamente`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} la carga del archivo falló.`);
      }
    }
  };

  return (
    <div
      style={{ paddingLeft: "10px", marginTop: "10px", marginRight: "10px" }}
    >
      <PageHeader
        style={{
          border: "1px solid rgb(235, 237, 240)"
        }}
        title="Asignaciones"
        extra={[
          <Upload {...props}>
            <Button type="primary" key="1">
              <Icon type="upload" /> Cargar base de datos
            </Button>
          </Upload>
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

export default AssignmentsUpload;
