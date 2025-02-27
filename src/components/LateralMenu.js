import React from "react";
import { useQuery, gql } from "@apollo/client";
import { Affix, Menu } from "antd";
import { useHistory, withRouter } from "react-router-dom";
import {
  HomeOutlined,
  ReconciliationOutlined,
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
  CustomerServiceOutlined,
  OrderedListOutlined,
} from "@ant-design/icons";

const { SubMenu } = Menu;

const OBTENER_USUARIO = gql`
  query obtenerUsuario {
    obtenerUsuario {
      id
      nombre
      email
      tipousuario
    }
  }
`;

const LateralMenu = () => {
  const { data, loading, error } = useQuery(OBTENER_USUARIO);
  console.log(data);
  console.log(error);

  const history = useHistory();
  let { location } = history;
  const locationSplit = location.pathname.split("/");
  const currentLocation = locationSplit.pop();

  const link = (to) => {
    history.push(to);
  };

  console.log(currentLocation);

  if (loading) return null;

  const { tipousuario } = data.obtenerUsuario;

  return (
    <Affix offsetTop={10}>
      <Menu defaultSelectedKeys={currentLocation} mode="inline">
        <Menu.Item key="informacion" onClick={() => link("/informacion")}>
          <HomeOutlined
            className={`${
              currentLocation === "informacion" ? "menu-item-active" : ""
            }`}
          />
          <span>Información</span>
        </Menu.Item>
        <Menu.ItemGroup key="g1" title={`PERSONAL`}>
          <Menu.Item key="soporte" onClick={() => link("/soporte")}>
            <CustomerServiceOutlined
              className={`${
                currentLocation === "soporte" ? "menu-item-active" : ""
              }`}
            />
            <span>Soporte</span>
          </Menu.Item>

          <Menu.Item key="asignaciones" onClick={() => link("/asignaciones")}>
            <ReconciliationOutlined
              className={`${
                currentLocation === "asignaciones" ? "menu-item-active" : ""
              }`}
            />
            <span>Asignaciones</span>
          </Menu.Item>
          <Menu.Item key="gestion" onClick={() => link("/gestion")}>
            <OrderedListOutlined
              className={`${
                currentLocation === "gestion" ? "menu-item-active" : ""
              }`}
            />
            <span>Gestiones</span>
          </Menu.Item>

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

        {tipousuario === "Administrador" || tipousuario === "Desarrollador" ? (
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
              <Menu.Item key="soportes" onClick={() => link("/soportes")}>
                <CustomerServiceOutlined
                  className={`${
                    currentLocation === "soportes" ? "menu-item-active" : ""
                  }`}
                />
                <span>Soportes</span>
              </Menu.Item>
              <Menu.Item key="gestiones" onClick={() => link("/gestiones")}>
                <HistoryOutlined
                  className={`${
                    currentLocation === "gestiones" ? "menu-item-active" : ""
                  }`}
                />
                <span>Historial</span>
              </Menu.Item>
              <Menu.Item key="pagos" onClick={() => link("/pagos")}>
                <ContainerOutlined
                  className={`${
                    currentLocation === "pagos" ? "menu-item-active" : ""
                  }`}
                />
                <span>Pagos</span>
              </Menu.Item>
            </SubMenu>
          </Menu.ItemGroup>
        ) : null}

        {tipousuario === "Supervisor" ? (
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
              <Menu.Item
                key="asignaciones"
                onClick={() => link("/asignaciones")}
              >
                <PushpinOutlined
                  className={`${
                    currentLocation === "asignaciones" ? "menu-item-active" : ""
                  }`}
                />
                <span>Asignaciones</span>
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
            </SubMenu>
          </Menu.ItemGroup>
        ) : null}
      </Menu>
    </Affix>
  );
};

export default withRouter(LateralMenu);
