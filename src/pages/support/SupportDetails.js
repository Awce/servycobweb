import React from "react";
import { useQuery, gql } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { Card, PageHeader, Descriptions } from "antd";
import Loading from "../../components/Loading";
import moment from "moment";

const OBTENER_SOPORTE = gql`
  query obtenerSoporte($id: ID!) {
    obtenerSoporte(id: $id) {
      id
      nombre
      email
      telefono
      modelo
      ubicacion
      motivollamada
      otromotivo
      producto
      categoria
      motivo
      causa
      comentarios
      dictamen
      otrodictamen
      usuario
      creado
    }
  }
`;
const SupportDetails = (props) => {
  const { data, loading, error } = useQuery(OBTENER_SOPORTE, {
    variables: {
      id: props.match.params.Id,
    },
  });
  console.log(data);
  console.log(error);

  const history = useHistory();

  const goBack = () => {
    history.goBack();
  };

  if (loading) return <Loading />;

  const {
    nombre,
    email,
    telefono,
    modelo,
    ubicacion,
    motivollamada,
    otromotivo,
    producto,
    categoria,
    motivo,
    causa,
    comentarios,
    dictamen,
    otrodictamen,
    usuario,
    creado,
  } = data.obtenerSoporte;

  const myDate = moment(Number(creado)).format("DD MMM YYYY h:mm A");

  return (
    <div
      style={{ paddingLeft: "10px", marginTop: "10px", marginRight: "10px" }}
    >
      <PageHeader
        style={{
          border: "1px solid rgb(235, 237, 240)",
        }}
        title={nombre}
        subTitle="Detalles"
        onBack={goBack}
      />
      <div style={{ marginTop: "3px" }}>
        <Card>
          <Descriptions title="Datos del Contacto" layout="vertical" bordered>
            <Descriptions.Item label="Nombre completo">
              {nombre}
            </Descriptions.Item>
            <Descriptions.Item label="Correo electrónico">
              {email}
            </Descriptions.Item>
            <Descriptions.Item label="Teléfono">{telefono}</Descriptions.Item>
            <Descriptions.Item label="Modelo">{modelo}</Descriptions.Item>
            <Descriptions.Item label="Ubicación">{ubicacion}</Descriptions.Item>
            <Descriptions.Item label="Fecha y Hora">{myDate}</Descriptions.Item>
          </Descriptions>
        </Card>
      </div>
      <div style={{ marginTop: "3px" }}>
        <Card>
          <Descriptions title="Datos de la Llamada" layout="vertical" bordered>
            <Descriptions.Item label="Motivo de la llamada">
              {motivollamada}
            </Descriptions.Item>
            <Descriptions.Item label="Otro">{otromotivo}</Descriptions.Item>
            <Descriptions.Item label="Producto">{producto}</Descriptions.Item>
            <Descriptions.Item label="Categoría">{categoria}</Descriptions.Item>
            <Descriptions.Item label="Motivo">{motivo}</Descriptions.Item>
            <Descriptions.Item label="Causa">{causa}</Descriptions.Item>
            <Descriptions.Item label="Dictamen">{dictamen}</Descriptions.Item>
            <Descriptions.Item label="Otro">{otrodictamen}</Descriptions.Item>
            <Descriptions.Item label="Lo atendió">{usuario}</Descriptions.Item>
            <Descriptions.Item label="Comentarios">
              {comentarios}
            </Descriptions.Item>
          </Descriptions>
        </Card>
      </div>
    </div>
  );
};

export default SupportDetails;
