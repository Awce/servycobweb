import React from "react";
import { Avatar, Badge, Popover, Button } from "antd";
import { useHistory } from "react-router-dom";
import { firebaseLogout } from "../../services/firebase";

const UserAvatar = () => {
  let history = useHistory();
  const logOut = () => {
    firebaseLogout().then(() => {
      history.push("/login");
    });
  };

  const content = (
    <div
      style={{ paddingLeft: "20px", marginTop: "10px", marginRight: "20px" }}
    >
      <Avatar
        src="https://firebasestorage.googleapis.com/v0/b/servycob-app.appspot.com/o/avatars%2Fyo.jpeg?alt=media&token=e44759d8-3a24-4edc-a873-f427bf5fa430"
        size={80}
        alt="Raúl Hernández"
      />
      <span>
        <h1>Raúl Hernández</h1>
      </span>
      <Button size="large" onClick={logOut} block>
        Cerrar sesión
      </Button>
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
      <span> Raúl Hernández</span>
    </Popover>
  );
};

export default UserAvatar;
