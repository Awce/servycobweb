import React, { useState } from "react";
import Highlighter from "react-highlight-words";
import { useQuery, gql } from "@apollo/client";
import XLSX from "xlsx";
import Loading from "../../components/Loading";
import { saveAs } from "file-saver";
import { Link } from "react-router-dom";
import { PageHeader, Table, Button, Input, Space } from "antd";
import { DownloadOutlined, SearchOutlined } from "@ant-design/icons";

const OBTENER_MIS_ASIGNACIONES = gql`
  query obtenerAsignacionesUsuario {
    obtenerAsignacionesUsuario {
      id
      tipocartera
      numdama
      digitodama
      nombre
      numerozonafacturacion
      aniocampaniasaldo
      diasmora
      campanasvencidas
      saldofactura
      saldocobro
      cargosmoratorios
      totalacobrar
      telefonocasa
      telefonocelular
      direccion
      colonia
      referencia
      poblacion
      estado
      fechafacturacion
      fechafinalvigencia
      tipocuenta
      gestor
    }
  }
`;

const AssignmentsUserList = () => {
  const [findText, setFindText] = useState({
    searchText: "",
    searchedColumn: "",
  });
  const { data, loading, error } = useQuery(OBTENER_MIS_ASIGNACIONES);
  console.log(data);
  console.log(error);

  const columns = [
    {
      title: "Dama",
      dataIndex: "numdama",
      key: "numdama",
      align: "center",
      render: (text, contact) => (
        <Link to={`/asignacion/damas/${contact.id}`}>
          <span>{contact.numdama}</span>
        </Link>
      ),
    },
    {
      title: "Dígito",
      dataIndex: "digitodama",
      key: "digitodama",
      align: "center",
    },
    {
      title: "Nombre",
      dataIndex: "nombre",
      key: "nombre",
      align: "center",
    },
    {
      title: "Dirección",
      dataIndex: "direccion",
      key: "direccion",
      align: "center",
      ellipsis: true,
    },
    {
      title: "Teléfono Celular",
      dataIndex: "telefonocelular",
      key: "telefonocelular",
      align: "center",
    },
    {
      title: "Teléfono Casa",
      dataIndex: "telefonocasa",
      key: "telefonocasa",
      align: "center",
    },
    {
      title: "Saldo",
      dataIndex: "totalacobrar",
      key: "totalacobrar",
      align: "center",
      render: (text, contact) => <span>${contact.totalacobrar}</span>,
    },
  ];

  if (loading) return <Loading />;

  const writeAssignmentFile = () => {
    let wb = XLSX.utils.table_to_book(document.getElementById("mytable"), {
      sheet: "Asignaciones",
    });
    let wbout = XLSX.write(wb, {
      bookType: "xlsx",
      type: "binary",
      bookSST: true,
    });
    const s2ab = (s) => {
      let buf = new ArrayBuffer(s.length);
      let view = new Uint8Array(buf);
      for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff;
      return buf;
    };
    saveAs(
      new Blob([s2ab(wbout)], { type: "application/octet-stream" }),
      "Mis Asignaciones.xlsx"
    );
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: (text) =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setFindText({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setFindText({ searchText: "" });
  };

  return (
    <div
      style={{ paddingLeft: "10px", marginTop: "10px", marginRight: "10px" }}
    >
      <PageHeader
        style={{
          border: "1px solid rgb(235, 237, 240)",
        }}
        title="Mis Asignaciones"
        subTitle="Call Center"
        extra={[
          <Button
            key={1}
            onClick={writeAssignmentFile}
            icon={<DownloadOutlined />}
          >
            Exportar mis asignaciones
          </Button>,
        ]}
      />
      <Table
        id="mytable"
        columns={columns}
        dataSource={data.obtenerAsignacionesUsuario}
        style={{ marginTop: "3px" }}
        rowKey={(record) => record.id}
        pagination={{ pageSize: 25 }}
        scroll={{ y: 240 }}
        title={() => "Header"}
        footer={() => "Footer"}
      />
    </div>
  );
};

export default AssignmentsUserList;
