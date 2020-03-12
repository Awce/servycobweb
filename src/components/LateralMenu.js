import React from "react";
import { Menu, Icon } from "antd";
import { useHistory, withRouter } from "react-router-dom";

const { SubMenu } = Menu;

const LateralMenu = () => {
  const history = useHistory();
  let { location } = history;
  const locationSplit = location.pathname.split("/");
  const currentLocation = locationSplit.pop();

  const link = to => {
    history.push(to);
  };

  console.log(currentLocation);

  return (
    <Menu defaultSelectedKeys={currentLocation} defaultOpenKeys={["sub1"]} mode="inline">
      <Menu.ItemGroup key="g1" title="PERSONAL">
        <Menu.Item key="summary" onClick={() => link("/summary")}>
          <Icon
            type="home"
            className={`${
              currentLocation === "summary" ? "menu-item-active" : ""
            }`}
          />
          <span>Información general</span>
        </Menu.Item>
        <SubMenu
          key="sub1"
          title={
            <span>
              <Icon type="interaction" />
              <span>Gestiones</span>
            </span>
          }
        >
          <Menu.Item key="calls" onClick={() => link("/calls")}>
            <Icon
              type="phone"
              className={`${
                currentLocation === "calls" ? "menu-item-active" : ""
              }`}
            />
            <span>Llamadas</span>
          </Menu.Item>
          <Menu.Item key="visits" onClick={() => link("/visits")}>
            <Icon
              type="environment"
              className={`${
                currentLocation === "visits" ? "menu-item-active" : ""
              }`}
            />
            <span>Visitas</span>
          </Menu.Item>
          <Menu.Item key="pays" onClick={() => link("/pays")}>
            <Icon
              type="container"
              className={`${
                currentLocation === "pays" ? "menu-item-active" : ""
              }`}
            />
            <span>Pagos</span>
          </Menu.Item>
          <Menu.Item key="confirmations" onClick={() => link("/confirmations")}>
            <Icon
              type="check-circle"
              className={`${
                currentLocation === "confirmations" ? "menu-item-active" : ""
              }`}
            />
            <span>Confirmaciones</span>
          </Menu.Item>
        </SubMenu>
        <SubMenu
          key="sub3"
          title={
            <span>
              <Icon type="select" />
              <span>Canales</span>
            </span>
          }
        >
          <Menu.Item key="messages" onClick={() => link("/messages")}>
            <Icon
              type="message"
              className={`${
                currentLocation === "messages" ? "menu-item-active" : ""
              }`}
            />
            <span>Mensajes</span>
          </Menu.Item>
          <Menu.Item key="mails" onClick={() => link("/mails")}>
            <Icon
              type="mail"
              className={`${
                currentLocation === "mails" ? "menu-item-active" : ""
              }`}
            />
            <span>Correos</span>
          </Menu.Item>
        </SubMenu>
      </Menu.ItemGroup>

      <Menu.ItemGroup key="g2" title="ADMINISTRACION">
        <Menu.Item key="customers" onClick={() => link("/customers")}>
          <Icon
            type="contacts"
            className={`${
              currentLocation === "customers" ? "menu-item-active" : ""
            }`}
          />
          <span>Clientes</span>
        </Menu.Item>

        <SubMenu
          key="sub2"
          title={
            <span>
              <Icon type="idcard" />
              <span>RRHH</span>
            </span>
          }
        >
          <Menu.Item key="employees" onClick={() => link("/employees")}>
            <Icon
              type="usergroup-add"
              className={`${
                currentLocation === "employees" ? "menu-item-active" : ""
              }`}
            />
            <span>Empleados</span>
          </Menu.Item>
          <Menu.Item key="bonuses" onClick={() => link("/bonuses")}>
            <Icon
              type="gift"
              className={`${
                currentLocation === "bonuses" ? "menu-item-active" : ""
              }`}
            />
            <span>Bonos</span>
          </Menu.Item>
        </SubMenu>
        <Menu.Item key="reports" onClick={() => link("/reports")}>
          <Icon
            type="pie-chart"
            className={`${
              currentLocation === "reports" ? "menu-item-active" : ""
            }`}
          />
          <span>Reportes</span>
        </Menu.Item>
      </Menu.ItemGroup>

      <Menu.ItemGroup key="g3" title="CAPACITACION">
        <Menu.Item key="documentations" onClick={() => link("/documentations")}>
          <Icon
            type="read"
            className={`${
              currentLocation === "documentations" ? "menu-item-active" : ""
            }`}
          />
          <span>Documentación</span>
        </Menu.Item>
        <Menu.Item key="videos" onClick={() => link("/videos")}>
          <Icon
            type="video-camera"
            className={`${
              currentLocation === "videos" ? "menu-item-active" : ""
            }`}
          />
          <span>Videos</span>
        </Menu.Item>
        <Menu.Item key="questions" onClick={() => link("/questions")}>
          <Icon
            type="question"
            className={`${
              currentLocation === "questions" ? "menu-item-active" : ""
            }`}
          />
          <span>Preguntas</span>
        </Menu.Item>
      </Menu.ItemGroup>
    </Menu>
  );
};

export default withRouter(LateralMenu);
