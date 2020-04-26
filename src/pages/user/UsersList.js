import React, { useState, useEffect } from "react";
import { getUsers } from "../../services/firebase";
import { Link, useHistory } from "react-router-dom";
import { PageHeader, Button, Table, Avatar } from "antd";
import { UserAddOutlined, UserOutlined } from "@ant-design/icons";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const history = useHistory();

  const columns = [
    {
      title: "Foto",
      dataIndex: "imageUrl",
      key: "imageUrl",
      align: "center",
      render: (imageUrl) =>
        imageUrl ? (
          <Avatar src={imageUrl} />
        ) : (
          <Avatar icon={<UserOutlined />} />
        ),
    },
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
      align: "center",
      render: (text, user) => (
        <Link to={`/empleados/${user.id}`}>
          <span>
            {user.name} {user.lastname}
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
  ];

  const onRegisterUserButton = () => {
    history.push("/empelados/alta");
  };

  useEffect(() => {
    const getUsersFirebase = () => {
      getUsers()
        .then((res) => {
          console.log(res);
          setUsers(res);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    getUsersFirebase();
  }, []);

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
      <Table
        columns={columns}
        dataSource={users}
        rowKey={(users) => users.id}
        style={{ marginTop: "3px" }}
        pagination={{ pageSize: 25 }}
      />
    </div>
  );
};

export default UsersList;
