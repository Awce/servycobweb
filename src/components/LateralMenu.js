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
    <Menu defaultSelectedKeys={currentLocation} mode="inline">
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
        <Menu.Item key="calls" onClick={() => link("/calls")}>
          <Icon
            type="interaction"
            className={`${
              currentLocation === "calls" ? "menu-item-active" : ""
            }`}
          />
          <span>Gestiones</span>
        </Menu.Item>
        <SubMenu
          key="sub1"
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

        <SubMenu
          key="sub2"
          title={
            <span>
              <Icon type="book" />
              <span>Capacitación</span>
            </span>
          }
        >
          <Menu.Item
            key="documentations"
            onClick={() => link("/documentations")}
          >
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
        </SubMenu>
      </Menu.ItemGroup>

      <Menu.ItemGroup key="g2" title="ADMINISTRACION">
        <SubMenu
          key="sub3"
          title={
            <span>
              <Icon type="contacts" />
              <span>CRM</span>
            </span>
          }
        >
          <Menu.Item key="customers" onClick={() => link("/customers")}>
            <Icon
              type="team"
              className={`${
                currentLocation === "customers" ? "menu-item-active" : ""
              }`}
            />
            <span>Clientes</span>
          </Menu.Item>
          <Menu.Item key="assignments" onClick={() => link("/assignments")}>
            <Icon
              type="pushpin"
              className={`${
                currentLocation === "assignments" ? "menu-item-active" : ""
              }`}
            />
            <span>Asignaciones</span>
          </Menu.Item>
        </SubMenu>

        <SubMenu
          key="sub4"
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

        <SubMenu
          key="sub5"
          title={
            <span>
              <Icon type="pie-chart" />
              <span>Reportes</span>
            </span>
          }
        >
          <Menu.Item key="dictations" onClick={() => link("/dictations")}>
            <Icon
              type="history"
              className={`${
                currentLocation === "dictations" ? "menu-item-active" : ""
              }`}
            />
            <span>Dictaminación</span>
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
          <Menu.Item key="resume" onClick={() => link("/resume")}>
            <Icon
              type="database"
              className={`${currentLocation === "" ? "menu-item-active" : ""}`}
            />
            <span>Resumen</span>
          </Menu.Item>
        </SubMenu>
      </Menu.ItemGroup>
    </Menu>
  );
};

export default withRouter(LateralMenu);
