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
} from "@material-ui/core";
import { addAdmin } from "../../services/adminsServices";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const UsersAutocomplete = () => {
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
      : matchSorter(originalList, value, { keys: ["email"] });
  };

  useEffect(() => {
    if (selected !== "" && selected !== value) {
      setSelected("");
    }
    if (originalList === null) {
      getUsuarios().then(res => {
        setOriginalList(res);
      });
    }
  }, [originalList, selected, value]);

  const createAdmin = () => {
    console.log(selected);
    //addAdmin(selected, setIsLoading);
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
    placeholder: "Escriba el correo",
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
          <Button onClick={() => createAdmin()} color="primary">
            SI
          </Button>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            CANCELAR
          </Button>
        </DialogActions>
      </Dialog>

      <div className={classes.inputText}>
        <PlaylistAdd />
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
        />
      </div>
      <div className={classes.inputText}>
        <SaveAlt />
        {isLoading ? (
          <CircularProgress size={26} />
        ) : (
          <Button
            disabled={selected === "" ? true : false}
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => setOpenDialog(true)}
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
