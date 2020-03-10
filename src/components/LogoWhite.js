import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logow.svg";

const LogoWhite = () => {
  return (
    <div>
      <Link to="/">
        <img src={logo} alt="logo" width="250px" />
      </Link>
    </div>
  );
};

export default LogoWhite;
