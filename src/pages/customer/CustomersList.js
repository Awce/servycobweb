import React from "react";
import { useQuery, gql } from "@apollo/client";
import Loading from "../../components/Loading";
import { Link, useHistory } from "react-router-dom";
import "bulma/css/bulma.css";
import { PageHeader, Button } from "antd";
import { UserAddOutlined } from "@ant-design/icons";

const OBTENER_CLIENTES = gql`
  query obtenerClientes {
    obtenerClientes {
      id
      empresa
      razonsocial
      rfc
      direccion
      email
      telefono
      logo
      web
    }
  }
`;

const CustomersList = () => {
  const { data, loading, error } = useQuery(OBTENER_CLIENTES);
  console.log(data);
  console.log(error);
  const history = useHistory();

  if (loading) return <Loading />;

  const onRegisterCustomerButton = () => {
    history.push("/clientes/alta");
  };

  return (
    <div
      style={{ paddingLeft: "10px", marginTop: "10px", marginRight: "10px" }}
    >
      <PageHeader
        style={{
          border: "1px solid rgb(235, 237, 240)",
        }}
        title="Clientes"
        subTitle="Lista"
        extra={[
          <Button
            type="primary"
            icon={<UserAddOutlined />}
            key={1}
            onClick={onRegisterCustomerButton}
          >
            Crear nuevo cliente
          </Button>,
        ]}
      />
      <div style={{ marginTop: "3px" }}>
        <table className="table is-fullwidth is-hoverable is-striped">
          <thead>
            <tr>
              <th>Logo</th>
              <th>Nombre</th>
              <th>Empresa</th>
              <th>RFC</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data.obtenerClientes.map((cliente) => (
              <tr key={cliente.id}>
                <td>
                  <figure className="image is-48x48">
                    <img src={cliente.logo} />
                  </figure>
                </td>
                <td>{cliente.empresa}</td>
                <td>{cliente.razonsocial}</td>
                <td>{cliente.rfc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomersList;
