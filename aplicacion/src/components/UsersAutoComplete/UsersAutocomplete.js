import React, { useState, useEffect } from "react";

//Autosuggest
import Autosuggest from "react-autosuggest";
import matchSorter from "match-sorter";

// styles
import useStyles from "./styles";
import { getUsuarios } from "../../services/DatosInicialesServices";

//icons
import { PlaylistAdd, SaveAlt } from "@material-ui/icons";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Slide,
  CircularProgress,
  InputBase,
  withStyles,
} from "@material-ui/core";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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

const renderInputComponent = inputProps => {
  return <BootstrapInput {...inputProps} />;
};

const UsersAutocomplete = ({ event, noValidation, userRol }) => {
  // local
  var [isLoading, setIsLoading] = useState(false);
  var classes = useStyles();

  const [selected, setSelected] = useState("");
  const [value, setValue] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [originalList, setOriginalList] = useState(null);

  const getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0
      ? []
      : matchSorter(originalList, value, {
          keys: ["email"],
        });
  };

  useEffect(() => {
    if (selected !== "" && selected !== value) {
      setSelected("");
    }
    if (originalList === null) {
      getUsuarios(userRol).then(res => {
        setOriginalList(res);
      });
    }
  }, [originalList, selected, value, userRol]);

  const onEvent = () => {
    event(selected, setIsLoading, setValue);
    setOpenDialog(false);
  };

  const getSuggestionValue = suggestion => {
    setSelected(suggestion.email);
    return suggestion.email;
  };

  const renderSuggestion = suggestion => (
    <div>
      {suggestion.email} ({suggestion.name} {suggestion.surname})
    </div>
  );

  const onChange = (event, { newValue }) => {
    setValue(newValue);
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const inputProps = {
    placeholder: "Ingrese el email",
    value,
    onChange: onChange,
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
            {`¿Estás seguro que deseas convertir la cuenta ${selected} en administradora?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => onEvent()} color="primary">
            SI
          </Button>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            CANCELAR
          </Button>
        </DialogActions>
      </Dialog>

      <div className={classes.inputContainer}>
        <PlaylistAdd />
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          renderInputComponent={renderInputComponent}
          inputProps={inputProps}
        />
      </div>
      <div className={classes.inputContainer}>
        <SaveAlt />
        {isLoading ? (
          <CircularProgress className={classes.loading} size={26} />
        ) : (
          <Button
            disabled={selected === "" ? true : false}
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => (noValidation ? onEvent() : setOpenDialog(true))}
          >
            Agregar
          </Button>
        )}
      </div>
      <br />
    </React.Fragment>
  );
};

export default UsersAutocomplete;
