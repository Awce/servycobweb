import React, { useState, useEffect } from "react";
import RegisterUserButton from "../../components/register/RegisterUserButton";
import { getUsers } from "../../services/firebase";
import { Link } from "react-router-dom";
import { PageHeader, Table, Avatar } from "antd";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const columns = [
    {
      title: "Foto",
      dataIndex: "imageUrl",
      key: "imageUrl",
      align: "center",
      render: imageUrl => <Avatar src={imageUrl} />
    },
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
      align: "center",
      render: (text, user) => (
        <Link to={`/employees/${user.id}`}>
          <span>
            {user.name} {user.lastname}
          </span>
        </Link>
      )
    },
    {
      title: "Correo",
      dataIndex: "email",
      key: "email",
      align: "center"
    }
  ];

  useEffect(() => {
    const getUsersFirebase = () => {
      getUsers()
        .then(res => {
          console.log(res);
          setUsers(res);
        })
        .catch(e => {
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
          border: "1px solid rgb(235, 237, 240)"
        }}
        title="Empleados"
        subTitle="Lista"
        extra={[<RegisterUserButton key="1" />]}
      />
      <Table
        columns={columns}
        dataSource={users}
        rowKey={users => users.id}
        style={{ marginTop: "3px" }}
        pagination={{ pageSize: 25 }}
      />
    </div>
  );
};

export default UsersList;
