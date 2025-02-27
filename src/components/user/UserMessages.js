import React, { useState } from "react";
//import { useSocket } from "../../hooks/useSocket";
//import { SocketContext } from "../../context/SocketContext";
import { Badge, Drawer, Empty } from "antd";
import { MessageTwoTone } from "@ant-design/icons";

const UserMessages = () => {
  const [show, setShow] = useState({
    visible: false,
  });

  //const { online } = useContext(SocketContext);
  //const { online } = useSocket("http://localhost:8080");

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
        <MessageTwoTone style={{ fontSize: "24px" }} onClick={showDrawer} />
      </Badge>
      <Drawer
        title="Mensajes"
        width={420}
        bodyStyle={{ paddingBottom: 80 }}
        onClose={onClose}
        visible={visible}
      >
        {/* {online ? <Badge status="success" /> : <Badge status="error" />} */}

        <Empty description={<span>No tienes mensajes</span>} />
      </Drawer>
    </>
  );
};

export default UserMessages;
