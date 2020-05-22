import React from "react";
import { Affix, Menu } from "antd";
import { useHistory, withRouter } from "react-router-dom";
import {
  HomeOutlined,
  InteractionOutlined,
  SelectOutlined,
  MessageOutlined,
  MailOutlined,
  BookOutlined,
  ReadOutlined,
  VideoCameraOutlined,
  QuestionOutlined,
  ContactsOutlined,
  TeamOutlined,
  PushpinOutlined,
  IdcardOutlined,
  UsergroupAddOutlined,
  GiftOutlined,
  PieChartOutlined,
  HistoryOutlined,
  ContainerOutlined,
  DatabaseOutlined,
} from "@ant-design/icons";

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
    <Affix offsetTop={10}>
      <Menu defaultSelectedKeys={currentLocation} mode="inline">
        <Menu.ItemGroup key="g1" title="PERSONAL">
          <Menu.Item key="informacion" onClick={() => link("/informacion")}>
            <HomeOutlined
              className={`${
                currentLocation === "informacion" ? "menu-item-active" : ""
              }`}
            />
            <span>Información general</span>
          </Menu.Item>
          <SubMenu
            key="sub0"
            title={
              <span>
                <InteractionOutlined />
                <span>Gestiones</span>
              </span>
            }
          >
            <Menu.Item key="asignacion" onClick={() => link("/asignacion")}>
              <PushpinOutlined
                className={`${
                  currentLocation === "asignacion" ? "menu-item-active" : ""
                }`}
              />
              <span>Asignaciones</span>
            </Menu.Item>
            <Menu.Item
              key="dictaminacion"
              onClick={() => link("/dictaminacion")}
            >
              <HistoryOutlined
                className={`${
                  currentLocation === "dictaminacion" ? "menu-item-active" : ""
                }`}
              />
              <span>Dictaminación</span>
            </Menu.Item>
          </SubMenu>

          <SubMenu
            key="sub1"
            title={
              <span>
                <SelectOutlined />
                <span>Canales</span>
              </span>
            }
          >
            <Menu.Item
              key="mensajes"
              onClick={() => link("/mensajes")}
              disabled
            >
              <MessageOutlined
                className={`${
                  currentLocation === "mensajes" ? "menu-item-active" : ""
                }`}
              />
              <span>Mensajes</span>
            </Menu.Item>
            <Menu.Item key="correos" onClick={() => link("/correos")} disabled>
              <MailOutlined
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
                <BookOutlined />
                <span>Capacitación</span>
              </span>
            }
          >
            <Menu.Item
              key="documentacion"
              onClick={() => link("/documentacion")}
              disabled
            >
              <ReadOutlined
                className={`${
                  currentLocation === "documentacion" ? "menu-item-active" : ""
                }`}
              />
              <span>Documentación</span>
            </Menu.Item>
            <Menu.Item key="videos" onClick={() => link("/videos")} disabled>
              <VideoCameraOutlined
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
              <QuestionOutlined
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
                <ContactsOutlined />
                <span>CRM</span>
              </span>
            }
          >
            <Menu.Item key="clientes" onClick={() => link("/clientes")}>
              <TeamOutlined
                className={`${
                  currentLocation === "clientes" ? "menu-item-active" : ""
                }`}
              />
              <span>Clientes</span>
            </Menu.Item>
            <Menu.Item key="asignaciones" onClick={() => link("/asignaciones")}>
              <PushpinOutlined
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
                <IdcardOutlined />
                <span>RRHH</span>
              </span>
            }
          >
            <Menu.Item key="empleados" onClick={() => link("/empleados")}>
              <UsergroupAddOutlined
                className={`${
                  currentLocation === "empleados" ? "menu-item-active" : ""
                }`}
              />
              <span>Empleados</span>
            </Menu.Item>
            <Menu.Item key="bonos" onClick={() => link("/bonos")} disabled>
              <GiftOutlined
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
                <PieChartOutlined />
                <span>Reportes</span>
              </span>
            }
          >
            <Menu.Item
              key="dictaminaciones"
              onClick={() => link("/dictaminaciones")}
            >
              <HistoryOutlined
                className={`${
                  currentLocation === "dictaminaciones"
                    ? "menu-item-active"
                    : ""
                }`}
              />
              <span>Dictaminación</span>
            </Menu.Item>
            <Menu.Item key="pagos" onClick={() => link("/pagos")}>
              <ContainerOutlined
                className={`${
                  currentLocation === "pagos" ? "menu-item-active" : ""
                }`}
              />
              <span>Pagos</span>
            </Menu.Item>
            <Menu.Item key="resumen" onClick={() => link("/resumen")}>
              <DatabaseOutlined
                className={`${
                  currentLocation === "resumen" ? "menu-item-active" : ""
                }`}
              />
              <span>Resumen</span>
            </Menu.Item>
          </SubMenu>
        </Menu.ItemGroup>
      </Menu>
    </Affix>
  );
};

export default withRouter(LateralMenu);
