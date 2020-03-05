import React, { useState, useEffect } from "react";
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
      style={{ paddingLeft: "20px", marginTop: "10px", marginRight: "20px" }}
    >
      <PageHeader
        style={{
          border: "1px solid rgb(235, 237, 240)"
        }}
        title="Empleados"
        subTitle="Lista"
      />
      <Table
        columns={columns}
        dataSource={users}
        rowKey={users => users.id}
        style={{ marginTop: "3px" }}
      />
    </div>
  );
};

export default UsersList;
