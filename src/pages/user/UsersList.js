import React from "react";
import { useQuery, gql } from "@apollo/client";
import Loading from "../../components/Loading";
import { Link, useHistory } from "react-router-dom";
import { PageHeader, Button, Table, Avatar, Tag } from "antd";
import {
  UserAddOutlined,
  UserOutlined,
  // DeleteTwoTone,
  // EditTwoTone,
} from "@ant-design/icons";

const OBTENER_USUARIOS = gql`
  query obtenerUsuarios {
    obtenerUsuarios {
      id
      nombre
      apellido
      email
      creado
      tipousuario
      avatar
    }
  }
`;

const UsersList = () => {
  const { data, loading, error } = useQuery(OBTENER_USUARIOS);
  console.log(data);
  console.log(error);
  const history = useHistory();

  const columns = [
    {
      title: "Foto",
      dataIndex: "avatar",
      key: "avatar",
      align: "center",
      render: (avatar) =>
        avatar ? (
          <Avatar size="large" src={avatar} />
        ) : (
          <Avatar size="large" icon={<UserOutlined />} />
        ),
    },
    {
      title: "Nombre",
      dataIndex: "nombre",
      key: "nombre",
      align: "center",
      render: (text, user) => (
        <Link to={`/empleados/${user.id}`}>
          <span>
            {user.nombre} {user.apellido}
          </span>
        </Link>
      ),
    },
    {
      title: "Correo",
      dataIndex: "email",
      key: "email",
      align: "center",
    },
    {
      title: "Usuario",
      dataIndex: "tipousuario",
      key: "tipousuario",
      align: "center",
      render: (tipousuario) => (
        <>
          {tipousuario === "Administrador" ? (
            <Tag color="gold">{tipousuario}</Tag>
          ) : null}
          {tipousuario === "Gestor" ? (
            <Tag color="blue">{tipousuario}</Tag>
          ) : null}
          {tipousuario === "Desarrollador" ? (
            <Tag color="cyan">{tipousuario}</Tag>
          ) : null}
          {tipousuario === "Supervisor" ? (
            <Tag color="purple">{tipousuario}</Tag>
          ) : null}{" "}
        </>
      ),
    },
    // {
    //   title: "Acciones",
    //   key: "action",
    //   render: (text, record) => (
    //     <Space size="middle">
    //       <EditTwoTone style={{ fontSize: "18px" }} onClick={editCustomer} />
    //       <DeleteTwoTone style={{ fontSize: "18px" }} onClick={editCustomer} />
    //     </Space>
    //   ),
    // },
  ];

  if (loading) return <Loading />;

  const onRegisterUserButton = () => {
    history.push("/empelados/alta");
  };

  // const editCustomer = () => {
  //   console.log("Test");
  // };

  return (
    <div
      style={{ paddingLeft: "10px", marginTop: "10px", marginRight: "10px" }}
    >
      <PageHeader
        style={{
          border: "1px solid rgb(235, 237, 240)",
        }}
        title="Empleados"
        subTitle="Lista"
        extra={[
          <Button
            type="primary"
            key={1}
            onClick={onRegisterUserButton}
            icon={<UserAddOutlined />}
          >
            Registrar usuario
          </Button>,
        ]}
      />
      <div style={{ marginTop: "3px" }}>
        <Table
          columns={columns}
          dataSource={data.obtenerUsuarios}
          rowKey={(record) => record.id}
          style={{ marginTop: "3px" }}
          pagination={{ pageSize: 25 }}
          // scroll={{ y: 240 }}
        />
      </div>
    </div>
  );
};

export default UsersList;
