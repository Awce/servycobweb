import React, { useContext } from "react";
import { Avatar, Badge, Popover, Button, PageHeader } from "antd";
import { UserContext } from "../../context/UserContext";

const UserAvatar = () => {
  const { user, login, logout } = useContext(UserContext);

  const content = (
    <div
      style={{ paddingLeft: "20px", marginTop: "10px", marginRight: "20px" }}
    >
      <PageHeader
        style={{
          border: "1px solid rgb(235, 237, 240)"
        }}
        subTitle="Mi cuenta"
        extra={
          user ? (
            <Button onClick={logout} block>
              Cerrar sesión
            </Button>
          ) : (
            <Button onClick={login} block>
              Iniciar sesión
            </Button>
          )
        }
      />
      <Avatar
        src={user && `${user.photoURl}`}
        size={80}
        alt={user && `Bienvenido, ${user.email}`}
      />
      <span>{user && <span> {user.email}</span>}</span>
    </div>
  );

  return (
    <Popover content={content}>
      <Badge count={0}>
        <Avatar
          src={user && `${user.photoURl}`}
          size="large"
          alt={user && `Bienvenido, ${user.email}`}
        />
      </Badge>
      {user && <span> {user.email}</span>}
    </Popover>
  );
};

export default UserAvatar;
