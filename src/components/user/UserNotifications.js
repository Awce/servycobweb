import React, { useState } from "react";
import { Badge, Icon, Drawer, Empty } from "antd";

const UserNotifications = () => {
  const [show, setShow] = useState({
    visible: false
  });

  const showDrawer = () => {
    setShow({
      visible: true
    });
  };

  const onClose = () => {
    setShow({
      visible: false
    });
  };

  const { visible } = show;

  return (
    <div>
      <Badge count={0} dot>
        <Icon
          style={{ fontSize: "24px" }}
          type="notification"
          onClick={showDrawer}
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
    </div>
  );
};

export default UserNotifications;
