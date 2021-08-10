import React from "react";
import { List, Card, Avatar } from "antd";

const data = [
  {
    title: "Raul Hernandez",
  },
  {
    title: "Otro Gestor 1",
  },
  {
    title: "Otro Gestor 2",
  },
  {
    title: "Otro Gestor 3",
  },
];

const TopSellers = () => {
  return (
    <Card title="Top Gestores">
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <Avatar src="https://firebasestorage.googleapis.com/v0/b/servycob-app.appspot.com/o/avatars%2Fyo.jpeg?alt=media&token=e44759d8-3a24-4edc-a873-f427bf5fa430" />
              }
              title={item.title}
              description="Preuba"
            />
          </List.Item>
        )}
      />
    </Card>
  );
};

export default TopSellers;
