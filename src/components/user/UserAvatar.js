import React from "react";
import { Avatar, Badge } from "antd";

const UserAvatar = () => {
  return (
    <Badge count={10}>
      <Avatar icon="user" />
    </Badge>
  );
};

export default UserAvatar;
