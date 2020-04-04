import React from "react";
import { Menu, Icon } from "antd";
import { useHistory, withRouter } from "react-router-dom";

const { SubMenu } = Menu;

const LateralMenu = () => {
  const history = useHistory();
  let { location } = history;
  const locationSplit = location.pathname.split("/");
  const currentLocation = locationSplit.pop();

  const link = (to) => {
    history.push(to);
  };

  console.log(currentLocation);

  return (
    <Menu defaultSelectedKeys={currentLocation} mode="inline">
      <Menu.ItemGroup key="g1" title="PERSONAL">
        <Menu.Item key="informacion" onClick={() => link("/informacion")}>
          <Icon
            type="home"
            className={`${
              currentLocation === "informacion" ? "menu-item-active" : ""
            }`}
          />
          <span>Información general</span>
        </Menu.Item>
        <Menu.Item key="gestiones" onClick={() => link("/gestiones")}>
          <Icon
            type="interaction"
            className={`${
              currentLocation === "gestiones" ? "menu-item-active" : ""
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
          <Menu.Item key="mensajes" onClick={() => link("/mensajes")} disabled>
            <Icon
              type="message"
              className={`${
                currentLocation === "mensajes" ? "menu-item-active" : ""
              }`}
            />
            <span>Mensajes</span>
          </Menu.Item>
          <Menu.Item key="correos" onClick={() => link("/correos")} disabled>
            <Icon
              type="mail"
              className={`${
                currentLocation === "correos" ? "menu-item-active" : ""
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
            key="documentacion"
            onClick={() => link("/documentacion")}
            disabled
          >
            <Icon
              type="read"
              className={`${
                currentLocation === "documentacion" ? "menu-item-active" : ""
              }`}
            />
            <span>Documentación</span>
          </Menu.Item>
          <Menu.Item key="videos" onClick={() => link("/videos")} disabled>
            <Icon
              type="video-camera"
              className={`${
                currentLocation === "videos" ? "menu-item-active" : ""
              }`}
            />
            <span>Videos</span>
          </Menu.Item>
          <Menu.Item
            key="preguntas"
            onClick={() => link("/preguntas")}
            disabled
          >
            <Icon
              type="question"
              className={`${
                currentLocation === "preguntas" ? "menu-item-active" : ""
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
          <Menu.Item key="clientes" onClick={() => link("/clientes")}>
            <Icon
              type="team"
              className={`${
                currentLocation === "clientes" ? "menu-item-active" : ""
              }`}
            />
            <span>Clientes</span>
          </Menu.Item>
          <Menu.Item key="asignaciones" onClick={() => link("/asignaciones")}>
            <Icon
              type="pushpin"
              className={`${
                currentLocation === "asignaciones" ? "menu-item-active" : ""
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
          <Menu.Item key="empleados" onClick={() => link("/empleados")}>
            <Icon
              type="usergroup-add"
              className={`${
                currentLocation === "empleados" ? "menu-item-active" : ""
              }`}
            />
            <span>Empleados</span>
          </Menu.Item>
          <Menu.Item key="bonos" onClick={() => link("/bonos")} disabled>
            <Icon
              type="gift"
              className={`${
                currentLocation === "bonos" ? "menu-item-active" : ""
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
          <Menu.Item
            key="dictaminaciones"
            onClick={() => link("/dictaminaciones")}
          >
            <Icon
              type="history"
              className={`${
                currentLocation === "dictaminaciones" ? "menu-item-active" : ""
              }`}
            />
            <span>Dictaminación</span>
          </Menu.Item>
          <Menu.Item key="pagos" onClick={() => link("/pagos")}>
            <Icon
              type="container"
              className={`${
                currentLocation === "pagos" ? "menu-item-active" : ""
              }`}
            />
            <span>Pagos</span>
          </Menu.Item>
          <Menu.Item key="resumen" onClick={() => link("/resumen")}>
            <Icon
              type="database"
              className={`${
                currentLocation === "resumen" ? "menu-item-active" : ""
              }`}
            />
            <span>Resumen</span>
          </Menu.Item>
        </SubMenu>
      </Menu.ItemGroup>
    </Menu>
  );
};

export default withRouter(LateralMenu);
