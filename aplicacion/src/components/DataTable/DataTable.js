import React, { useState, useCallback, forwardRef } from "react";
import {
  withStyles,
  InputBase,
  IconButton,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Slide,
} from "@material-ui/core";
import DataTable, { memoize } from "react-data-table-component";
import { Delete as DeleteIcon, GroupAdd as AddIcon } from "@material-ui/icons";
import matchSorter from "match-sorter";
//styles
import useStyles from "./styles";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const contextActions = memoize((handleClick, acceptButton) => (
  <React.Fragment>
    {acceptButton && (
      <IconButton onClick={() => handleClick(1)}>
        <AddIcon />
      </IconButton>
    )}
    <IconButton onClick={() => handleClick(0)}>
      <DeleteIcon />
    </IconButton>
  </React.Fragment>
));

const BootstrapInput = withStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: "300px",
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
    width: "100%",
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

const CheckBox = forwardRef((checkboxProps, ref) => {
  return (
    <Checkbox
      ref={ref}
      color="primary"
      inputProps={{
        "aria-label": "secondary checkbox",
      }}
      {...checkboxProps}
    />
  );
});

const DataTableComponent = ({
  title,
  data,
  columns,
  selectedEvent,
  acceptButton = false,
}) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [filterText, setFilterText] = React.useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [option, setOption] = useState(0);
  const [clearRows, setClearRows] = useState(false);

  const handleChange = useCallback(state => {
    setClearRows(false);
    setSelectedRows(state.selectedRows);
  }, []);

  const getSelectedRows = op => {
    const rows = selectedRows.map(r => r.email);
    setClearRows(true);
    setOpenDialog(false);
    selectedEvent(rows, op);
  };

  const filteredItems =
    data !== null
      ? matchSorter(data, filterText, {
          keys: ["email"],
        })
      : [];

  const contextActionEvent = option => {
    setOption(option);
    setOpenDialog(true);
  };

  return (
    <React.Fragment>
      <Dialog
        open={openDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setOpenDialog(false)}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"Atención"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {option === 0
              ? "¿Estás seguro que borrar los registros seleccionados?"
              : "¿Estás seguro que deseas aceptar los registros seleccionados?"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => getSelectedRows(option)} color="primary">
            SI
          </Button>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            CANCELAR
          </Button>
        </DialogActions>
      </Dialog>

      <DataTable
        title={title}
        data={filteredItems}
        columns={columns}
        onRowSelected={handleChange}
        contextActions={contextActions(
          option => contextActionEvent(option),
          acceptButton,
        )}
        contextTitle={
          selectedRows.length === 1
            ? `${selectedRows.length} registro seleccionado`
            : `${selectedRows.length} registros seleccionados`
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
        selectableRows={selectedEvent ? true : false}
        selectableRowsComponent={CheckBox}
        clearSelectedRows={clearRows}
        pagination
        highlightOnHover
      />
    </React.Fragment>
  );
};

export default DataTableComponent;
