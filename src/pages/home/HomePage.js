import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <h1>Bienvenido a ServyCob</h1>
      <ul>
        <li>
          <Link to="/login">Inicia sesión</Link>
        </li>
        <li>
          <Link to="/register">Regístrate</Link>
        </li>
      </ul>
    </div>
  );
};

export default HomePage;
