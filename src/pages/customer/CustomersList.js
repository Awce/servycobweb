import React from "react";
import { useQuery, gql } from "@apollo/client";
import Loading from "../../components/Loading";
import { Link, useHistory } from "react-router-dom";
import { PageHeader, Button, Table, Avatar } from "antd";
import { UserAddOutlined, UserOutlined } from "@ant-design/icons";

const OBTENER_CLIENTES = gql`
  query obtenerClientes {
    obtenerClientes {
      id
      empresa
      razonsocial
      rfc
      direccion
      email
      telefono
      logo
      web
    }
  }
`;

const CustomersList = () => {
  const { data, loading, error } = useQuery(OBTENER_CLIENTES);
  console.log(data);
  console.log(error);
  const history = useHistory();

  const columns = [
    {
      title: "Logo",
      dataIndex: "logo",
      key: "logo",
      align: "center",
      render: (logo) =>
        logo ? (
          <Avatar shape="square" size="large" src={logo} />
        ) : (
          <Avatar shape="square" size="large" icon={<UserOutlined />} />
        ),
    },
    {
      title: "Nombre",
      dataIndex: "razonsocial",
      key: "razonsocial",
      align: "center",
      render: (text, cliente) => (
        <Link to={`/clientes/${cliente.id}`}>
          <span>{cliente.razonsocial}</span>
        </Link>
      ),
      onFilter: (value, record) => record.name.indexOf(value) === 0,
    },
    {
      title: "RFC",
      dataIndex: "rfc",
      key: "rfc",
      align: "center",
    },
    {
      title: "Correo",
      dataIndex: "email",
      key: "email",
      align: "center",
    },
  ];

  if (loading) return <Loading />;

  const onRegisterCustomerButton = () => {
    history.push("/clientes/alta");
  };

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
      <div style={{ marginTop: "3px" }}>
        <Table
          columns={columns}
          dataSource={data.obtenerClientes}
          rowKey={(record) => record.id}
          style={{ marginTop: "3px" }}
          pagination={{ pageSize: 25 }}
          scroll={{ y: 240 }}
        />
      </div>
    </div>
  );
};

export default CustomersList;
