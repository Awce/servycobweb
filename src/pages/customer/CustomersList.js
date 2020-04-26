import React, { useState, useEffect } from "react";
import { getCustomers } from "../../services/firebase";
import { Link, useHistory } from "react-router-dom";
import { PageHeader, Table, Badge, Avatar, Button } from "antd";
import { UserAddOutlined, UserOutlined } from "@ant-design/icons";

const CustomersList = () => {
  const [customers, setCustomers] = useState([]);
  const history = useHistory();

  const columns = [
    {
      title: "#",
      dataIndex: "logo",
      key: "id",
      align: "center",
      render: (logo, name) =>
        logo ? (
          <figure>
            <img src={logo} alt={name} width="100px" />
          </figure>
        ) : (
          <Avatar shape="square" size="large" icon={<UserOutlined />} />
        ),
    },
    {
      title: "Cliente",
      dataIndex: "name",
      key: "name",
      align: "center",
      render: (text, customer) => (
        <Link to={`/clientes/${customer.id}`}>
          <span>{customer.name}</span>
        </Link>
      ),
    },
    {
      title: "Desde",
      dataIndex: "customerform",
      key: "customerform",
      align: "center",
    },
    {
      title: "Gestores telefónicos",
      dataIndex: "managers",
      key: "managers",
      align: "center",
    },
    {
      title: "Gestores en campo",
      dataIndex: "fieldmanagers",
      key: "fieldmanagers",
      align: "center",
    },
    {
      title: "Supervisor",
      dataIndex: "supervisor",
      key: "supervisor",
      align: "center",
    },
    {
      title: "Desempeño",
      dataIndex: "ratings",
      key: "ratings",
      align: "center",
      render: (ratings) =>
        ratings ? <Badge status="success" text={ratings} /> : null,
    },
  ];

  const onRegisterCustomerButton = () => {
    history.push("/clientes/alta");
  };

  useEffect(() => {
    const getCustomersFirebase = () => {
      getCustomers()
        .then((res) => {
          console.log(res);
          setCustomers(res);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    getCustomersFirebase();
  }, []);

  return (
    <div
      style={{ paddingLeft: "10px", marginTop: "10px", marginRight: "10px" }}
    >
      <PageHeader
        style={{
          border: "1px solid rgb(235, 237, 240)",
        }}
        title="Clientes"
        subTitle="Lista"
        extra={[
          <Button
            type="primary"
            icon={<UserAddOutlined />}
            key={1}
            onClick={onRegisterCustomerButton}
          >
            Crear nuevo cliente
          </Button>,
        ]}
      />
      <Table
        style={{ marginTop: "3px" }}
        columns={columns}
        dataSource={customers}
        rowKey={(customers) => customers.id}
        pagination={{ pageSize: 5 }}
        scroll={{ y: 440 }}
      />
    </div>
  );
};

export default CustomersList;
