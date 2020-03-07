import React from "react";
import { Button } from "antd";
import { useHistory } from "react-router-dom";
import { firebaseLogout } from "../../services/firebase";

const UserButtonLogout = () => {
  let history = useHistory();

  const userLogout = () => {
    firebaseLogout().then(() => {
      history.push("/");
    });
  };
  return (
    <Button
      type="primary"
      htmlType="submit"
      className="login-form-button"
      size="large"
      block
      onClick={userLogout}
    >
      Cerrar sesion
    </Button>
  );
};

export default UserButtonLogout;
