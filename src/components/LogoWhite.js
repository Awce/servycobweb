import React from "react";
import { Link } from "react-router-dom";

const LogoWhite = () => {
  return (
    <div>
      <Link to="/">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/servycob-app.appspot.com/o/LOGO%20Servycob%204.png?alt=media&token=5c2824de-678a-4254-9d4a-a95667f739eb"
          alt="logo"
          width="250px"
        />
      </Link>
    </div>
  );
};

export default LogoWhite;
