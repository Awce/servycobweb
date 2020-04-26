import React, { useState } from "react";
import { Badge, Drawer, Empty } from "antd";
import { MailTwoTone } from "@ant-design/icons";

const UserEmails = () => {
  const [show, setShow] = useState({
    visible: false,
  });

  const showDrawer = () => {
    setShow({
      visible: true,
    });
  };

  const onClose = () => {
    setShow({
      visible: false,
    });
  };
  const { visible } = show;
  return (
    <>
      <Badge count={0} dot>
        <MailTwoTone style={{ fontSize: "24px" }} onClick={showDrawer} />
      </Badge>
      <Drawer
        title="Correos"
        width={420}
        bodyStyle={{ paddingBottom: 80 }}
        onClose={onClose}
        visible={visible}
      >
        <Empty description={<span>No tienes correos</span>} />
      </Drawer>
    </>
  );
};

export default UserEmails;
