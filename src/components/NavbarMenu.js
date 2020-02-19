import React from "react";
import { Menu, Icon } from "antd";
import { Link } from "react-router-dom";
import { firebaseLogout } from "../services/firebase";

const { SubMenu } = Menu;

const NavbarMenu = () => {
  const logout = () => {
    firebaseLogout();
  };
  return (
    <Menu mode="horizontal">
      <Menu.Item key="1">
        <Link to="/">
          <Icon type="mail" />
        </Link>
      </Menu.Item>
      <SubMenu
        title={
          <span className="submenu-title-wrapper">
            <Icon type="setting" />
            Raul Hernandez
          </span>
        }
      >
        <Menu.ItemGroup title="Item 1">
          <Menu.Item key="setting:1">Option 1</Menu.Item>
          <Menu.Item key="setting:2">Option 2</Menu.Item>
        </Menu.ItemGroup>
        <Menu.Item key="1" onClick={logout}>
          <Icon type="logout" />
          Cerrar sesion
        </Menu.Item>
      </SubMenu>
    </Menu>
  );
};

export default NavbarMenu;
