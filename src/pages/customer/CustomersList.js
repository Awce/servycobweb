import React, { useState, useEffect } from "react";
import RegisterCustomerButton from "../../components/register/RegisterCustomerButton";
import { getCustomers, getCustomer } from "../../services/firebase";
import { Link } from "react-router-dom";
import { PageHeader, Table, Badge, Input } from "antd";

const { Search } = Input;

const CustomersList = () => {
  const [customers, setCustomers] = useState([]);

  const columns = [
    {
      title: "#",
      dataIndex: "logo",
      key: "id",
      align: "center",
      render: (logo, name) => (
        <figure>
          <img src={logo} alt={name} width="100px" />
        </figure>
      )
    },
    {
      title: "Cliente",
      dataIndex: "name",
      key: "name",
      align: "center",
      render: (text, customer) => (
        <Link to={`/customers/${customer.id}`}>
          <span>{customer.name}</span>
        </Link>
      )
    },
    {
      title: "Desde",
      dataIndex: "customerform",
      key: "customerform",
      align: "center"
    },
    {
      title: "Gestores telefónicos",
      dataIndex: "managers",
      key: "managers",
      align: "center"
    },
    {
      title: "Gestores en campo",
      dataIndex: "fieldmanagers",
      key: "fieldmanagers",
      align: "center"
    },
    {
      title: "Supervisor",
      dataIndex: "supervisor",
      key: "supervisor",
      align: "center"
    },
    {
      title: "Desempeño",
      dataIndex: "ratings",
      key: "ratings",
      align: "center",
      render: ratings => <Badge status="success" text={ratings} />
    }
  ];

  const searchValue = value => {
    console.log(value);
  };

  useEffect(() => {
    const getCustomersFirebase = () => {
      getCustomers()
        .then(res => {
          console.log(res);
          setCustomers(res);
        })
        .catch(e => {
          console.log(e);
        });
    };
    getCustomersFirebase();
  }, []);

  return (
    <div
      style={{ paddingLeft: "20px", marginTop: "10px", marginRight: "20px" }}
    >
      <PageHeader
        style={{
          border: "1px solid rgb(235, 237, 240)"
        }}
        title="Clientes"
        subTitle="Lista"
        extra={[<RegisterCustomerButton key="1" />]}
      />
      <Table
        style={{ marginTop: "3px" }}
        columns={columns}
        dataSource={customers}
        rowKey={customers => customers.id}
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default CustomersList;
