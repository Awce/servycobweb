import React from "react";
import { useQuery, gql } from "@apollo/client";
import Loading from "./Loading";
import { List, Card, Avatar } from "antd";

const MEJORES_USUARIOS = gql`
  query mejoresUsuarios {
    mejoresUsuarios {
      usuario {
        nombre
        apellido
        email
        avatar
      }
      total
    }
  }
`;

const TopSellers = () => {
  const { data, loading, error } = useQuery(MEJORES_USUARIOS);
  console.log(data);
  console.log(error);

  if (loading) return <Loading />;

  return (
    <Card title="Top Gestores">
      <List
        itemLayout="horizontal"
        dataSource={data.mejoresUsuarios}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={item.usuario[0].avatar} />}
              title={`${item.usuario[0].nombre} ${item.usuario[0].apellido}`}
              description={`Ha recuperado: $${item.total}`}
            />
          </List.Item>
        )}
      />
    </Card>
  );
};

export default TopSellers;
