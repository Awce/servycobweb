import React, { useState } from "react";
import { Badge, Drawer, Empty } from "antd";
import { NotificationTwoTone } from "@ant-design/icons";

const UserNotifications = () => {
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
        <NotificationTwoTone
          onClick={showDrawer}
          style={{ fontSize: "24px" }}
        />
      </Badge>
      <Drawer
        title="Notificaciones"
        width={420}
        bodyStyle={{ paddingBottom: 80 }}
        onClose={onClose}
        visible={visible}
      >
        <Empty description={<span>No tienes notificaciones</span>} />
      </Drawer>
    </>
  );
};

export default UserNotifications;
