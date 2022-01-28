import React from "react";
import { useQuery, gql } from "@apollo/client";
import Loading from "../../components/Loading";
import { Link, useHistory } from "react-router-dom";
import { PageHeader, Button, Table } from "antd";
import { CustomerServiceOutlined } from "@ant-design/icons";

const OBTENER_SOPORTES = gql`
  query obtenerSoportes {
    obtenerSoportes {
      id
      nombre
      email
      telefono
      modelo
      ubicacion
      motivollamada
      otro
      producto
      categoria
      motivo
      causa
      comentarios
      dictamen
    }
  }
`;

const SupportsList = () => {
  const { data, loading, error } = useQuery(OBTENER_SOPORTES);
  console.log(data);
  console.log(error);
  const history = useHistory();

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      align: "center",
    },
    {
      title: "Nombre",
      dataIndex: "nombre",
      key: "nombre",
      align: "center",
      render: (text, support) => (
        <Link to={`/soporte/${support.id}`}>
          <span>{support.nombre}</span>
        </Link>
      ),
    },
    {
      title: "Correo",
      dataIndex: "email",
      key: "email",
      align: "center",
    },
    {
      title: "Teléfono",
      dataIndex: "telefono",
      key: "telefono",
      align: "center",
    },
    {
      title: "Modelo",
      dataIndex: "modelo",
      key: "modelo",
      align: "center",
    },
    {
      title: "Ubicación",
      dataIndex: "ubicacion",
      key: "ubicacion",
      align: "center",
    },
    {
      title: "Fecha",
      dataIndex: "creado",
      key: "creado",
      align: "center",
    },
    {
      title: "Motivo Llamada",
      dataIndex: "motivollamada",
      key: "motivollamada",
      align: "center",
    },
    {
      title: "Otro",
      dataIndex: "otro",
      key: "otro",
      align: "center",
    },
    {
      title: "Producto",
      dataIndex: "producto",
      key: "producto",
      align: "center",
    },
    {
      title: "Categoría",
      dataIndex: "categoria",
      key: "categoria",
      align: "center",
    },
    {
      title: "Motivo",
      dataIndex: "motivo",
      key: "motivo",
      align: "center",
    },
    {
      title: "Causa",
      dataIndex: "causa",
      key: "causa",
      align: "center",
    },
    {
      title: "Comentarios",
      dataIndex: "comentarios",
      key: "comentarios",
      align: "center",
    },
    {
      title: "Dictamen",
      dataIndex: "dictamen",
      key: "dictamen",
      align: "center",
    },
  ];

  if (loading) return <Loading />;

  const onRegisterSupportButton = () => {
    history.push("/soporte/nuevo");
  };

  return (
    <div
      style={{ paddingLeft: "10px", marginTop: "10px", marginRight: "10px" }}
    >
      <PageHeader
        style={{
          border: "1px solid rgb(235, 237, 240)",
        }}
        title="Soporte"
        subTitle="Lista"
        extra={[
          <Button
            type="primary"
            key={1}
            onClick={onRegisterSupportButton}
            icon={<CustomerServiceOutlined />}
          >
            Crear un ticket
          </Button>,
        ]}
      />
      <div style={{ marginTop: "3px" }}>
        <Table
          columns={columns}
          dataSource={data.obtenerSoportes}
          rowKey={(record) => record.id}
          style={{ marginTop: "3px" }}
          pagination={{ pageSize: 25 }}
          scroll={{ y: 240 }}
        />
      </div>
    </div>
  );
};

export default SupportsList;
