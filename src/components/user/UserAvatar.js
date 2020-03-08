import React, { useContext } from "react";
import { Avatar, Badge, Popover, Button } from "antd";
import { UserContext } from "../../context/UserContext";

const UserAvatar = () => {
  const { user, login, logout } = useContext(UserContext);

  const content = (
    <div
      style={{ paddingLeft: "20px", marginTop: "10px", marginRight: "20px" }}
    >
      <Avatar
        src="https://firebasestorage.googleapis.com/v0/b/servycob-app.appspot.com/o/avatars%2Fyo.jpeg?alt=media&token=e44759d8-3a24-4edc-a873-f427bf5fa430"
        size={80}
        alt="Raúl Hernández"
      />
      <span>{user && <h1>{user.name}</h1>}</span>

      {user ? (
        <Button size="large" onClick={logout} block>
          Cerrar sesión
        </Button>
      ) : (
        <Button size="large" onClick={login} block>
          Iniciar sesión
        </Button>
      )}
    </div>
  );

  return (
    <Popover content={content}>
      <Badge count={10}>
        <Avatar
          size="large"
          src="https://firebasestorage.googleapis.com/v0/b/servycob-app.appspot.com/o/avatars%2Fyo.jpeg?alt=media&token=e44759d8-3a24-4edc-a873-f427bf5fa430"
          alt="Raúl Hernández"
        />
      </Badge>
      {user && <span> {user.name}</span>}
    </Popover>
  );
};

export default UserAvatar;
