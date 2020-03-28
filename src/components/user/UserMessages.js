import React, { useState } from "react";
import { Badge, Icon, Drawer, Empty } from "antd";

const UserMessages = () => {
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
          type="message"
          onClick={showDrawer}
          theme="twoTone"
        />
      </Badge>
      <Drawer
        title="Mensajes"
        width={420}
        bodyStyle={{ paddingBottom: 80 }}
        onClose={onClose}
        visible={visible}
      >
        <Empty description={<span>No tienes mensajes</span>} />
      </Drawer>
    </div>
  );
};

export default UserMessages;
