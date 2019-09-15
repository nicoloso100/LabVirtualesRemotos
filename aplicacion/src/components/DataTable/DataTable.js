import React, { useState, useCallback } from "react";
import { withStyles, InputBase, IconButton } from "@material-ui/core";
import DataTable, { memoize } from "react-data-table-component";
import { Delete as DeleteIcon } from "@material-ui/icons";
import matchSorter from "match-sorter";
//styles
import useStyles from "./styles";

const contextActions = memoize(handleClick => (
  <IconButton onClick={() => handleClick()}>
    <DeleteIcon />
  </IconButton>
));

const BootstrapInput = withStyles(theme => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.common.white,
    border: "1px solid #ced4da",
    fontSize: 12,
    width: "auto",
    padding: "10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      borderColor: theme.palette.primary.main,
    },
  },
}))(InputBase);

const Filter = ({ onFilter }) => {
  var classes = useStyles();
  return (
    <div className={classes.inputContainer}>
      <BootstrapInput
        placeholder="Filtrar por email"
        onChange={e => onFilter(e.target.value)}
      />
    </div>
  );
};

const DataTableComponent = ({ data, columns }) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [filterText, setFilterText] = React.useState("");

  const handleChange = useCallback(state => {
    setSelectedRows(state.selectedRows);
  }, []);

  const getSelectedRows = () => {
    const rows = selectedRows.map(r => r.email);
  };

  const filteredItems =
    data !== null
      ? matchSorter(data, filterText, {
          keys: ["email"],
        })
      : [];

  return (
    <DataTable
      title="Lista de administradores"
      data={filteredItems}
      columns={columns}
      onRowSelected={handleChange}
      contextActions={contextActions(getSelectedRows)}
      contextTitle={
        selectedRows.length === 1
          ? `${selectedRows.length} Administrador seleccionado`
          : `${selectedRows.length} Administradores seleccionados`
      }
      paginationComponentOptions={{
        rowsPerPageText: "Filas por página:",
        rangeSeparatorText: "de",
      }}
      noDataComponent="No se han encontrado registros"
      fixedHeader
      fixedHeaderScrollHeight="300px"
      subHeader
      subHeaderComponent={<Filter onFilter={value => setFilterText(value)} />}
      selectableRows
      pagination
      highlightOnHover
    />
  );
};

export default DataTableComponent;
