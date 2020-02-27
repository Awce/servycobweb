import React, { useState, useEffect } from "react";
import { Tabs, Card, Icon } from "antd";
import { getCustomer } from "../../services/firebase";

const { TabPane } = Tabs;
const { Meta } = Card;

const CustomerDetail = props => {
  const [customer, setCustomer] = useState({});

  useEffect(() => {
    getCustomer(props.match.params.Id)
      .then(r => {
        setCustomer(r);
      })
      .catch(e => {
        console.log(e);
      });
  });

  const { name, namebusiness, logo, address } = customer;

  return (
    <div style={{ paddingLeft: "10px", marginTop: "10px" }}>
      <h1>{namebusiness}</h1>
      <Tabs defaultActiveKey="1">
        <TabPane tab="PERFIL" key="1">
          <Card
            hoverable
            style={{ width: 240 }}
            cover={
              <figure>
                <img src={logo} alt={name} />
              </figure>
            }
          >
            <Meta title={name} description={<Icon type="environment" />} />
            <p>{address}</p>
          </Card>
        </TabPane>
        <TabPane tab="FACTURACION Y COBRANZA" key="2">
          Content of Tab Pane 2
        </TabPane>
        <TabPane tab="GRUPOS DE TRABAJO" key="3">
          Content of Tab Pane 3
        </TabPane>
        <TabPane tab="CAMPAÑAS" key="4">
          Content of Tab Pane 4
        </TabPane>
        <TabPane tab="BLOQUES DE EVALUACION" key="5">
          Content of Tab Pane 5
        </TabPane>
        <TabPane tab="BLOQUES DE DICTAMEN" key="6">
          Content of Tab Pane 6
        </TabPane>
      </Tabs>
    </div>
  );
};

export default CustomerDetail;
