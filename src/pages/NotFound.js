import React from "react";
import { Result, Button } from "antd";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Esta pagina no existe"
      extra={
        <Link to="/">
          <Button>Regresar al inicio</Button>
        </Link>
      }
    />
  );
};

export default NotFound;
