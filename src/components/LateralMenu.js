import React from "react";
import { Menu, Icon } from "antd";

const { SubMenu } = Menu;

const LateralMenu = () => {
  return (
    <Menu defaultSelectedKeys={["1"]} defaultOpenKeys={["sub1"]} mode="inline">
      <Menu.ItemGroup key="g1" title="PERSONAL">
        <Menu.Item key="1">
          <Icon type="home" />
          <span>Información general</span>
        </Menu.Item>
        <Menu.Item key="2">
          <Icon type="phone" />
          <span>Llamadas</span>
        </Menu.Item>
        <Menu.Item key="3">
          <Icon type="environment" />
          <span>Visitas</span>
        </Menu.Item>
        <Menu.Item key="4">
          <Icon type="container" />
          <span>Promesas de pago</span>
        </Menu.Item>
        <Menu.Item key="5">
          <Icon type="check-circle" />
          <span>Confirmaciones</span>
        </Menu.Item>
      </Menu.ItemGroup>

      <Menu.ItemGroup key="g2" title="ADMINISTRACION">
        <Menu.Item key="6">
          <Icon type="contacts" />
          <span>Clientes</span>
        </Menu.Item>

        <SubMenu
          key="sub1"
          title={
            <span>
              <Icon type="idcard" />
              <span>Recursos Humanos</span>
            </span>
          }
        >
          <Menu.Item key="7">
            <Icon type="usergroup-add" />
            <span>Usuarios</span>
          </Menu.Item>
          <Menu.Item key="8">
            <Icon type="gift" />
            <span>Bonos</span>
          </Menu.Item>
          <Menu.Item key="9">
            <Icon type="message" />
            <span>Mensajes</span>
          </Menu.Item>
        </SubMenu>
        <SubMenu
          key="sub2"
          title={
            <span>
              <Icon type="database" />
              <span>Base de datos</span>
            </span>
          }
        >
          <Menu.Item key="10">
            <Icon type="pie-chart" />
            <span>Reportes</span>
          </Menu.Item>
        </SubMenu>
      </Menu.ItemGroup>

      <Menu.ItemGroup key="g3" title="CAPACITACION">
        <Menu.Item key="11">
          <Icon type="read" />
          <span>Documentación</span>
        </Menu.Item>
        <Menu.Item key="12">
          <Icon type="video-camera" />
          <span>Videos</span>
        </Menu.Item>
        <Menu.Item key="13">
          <Icon type="question" />
          <span>Preguntas</span>
        </Menu.Item>
      </Menu.ItemGroup>
    </Menu>
  );
};

export default LateralMenu;
