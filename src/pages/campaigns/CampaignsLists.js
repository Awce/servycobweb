import React, { useState, useEffect } from "react";
import RegisterCampaignButton from "../../components/register/RegisterCampaignButton";
import { getCampaigns } from "../../services/firebase";
import { PageHeader, Table } from "antd";

const CampaignsLists = () => {
  const [campaigns, setCampaigns] = useState([]);

  const columns = [
    {
      title: "Campaña",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "Descripción",
      dataIndex: "description",
      key: "description",
      align: "center",
    },
  ];

  useEffect(() => {
    const getCampaignsFirebase = () => {
      getCampaigns()
        .then((res) => {
          console.log(res);
          setCampaigns(res);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    getCampaignsFirebase();
  }, []);

  return (
    <div style={{ marginTop: "3px" }}>
      <PageHeader
        style={{
          border: "1px solid rgb(235, 237, 240)",
        }}
        title="Campañas"
        extra={[<RegisterCampaignButton key="1" />]}
      />
      <Table
        style={{ marginTop: "3px" }}
        columns={columns}
        dataSource={campaigns}
        rowKey={(record) => record.id}
        pagination={{ pageSize: 25 }}
        scroll={{ y: 240 }}
      />
    </div>
  );
};

export default CampaignsLists;
