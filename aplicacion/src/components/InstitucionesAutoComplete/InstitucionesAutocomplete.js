import React, { useState, useEffect, useCallback } from "react";

//Autosuggest
import Autosuggest from "react-autosuggest";
import matchSorter from "match-sorter";

// styles
import useStyles from "./styles";

//icons
import { School as InstitucionIcon } from "@material-ui/icons";
import { InputBase, withStyles } from "@material-ui/core";

const BootstrapInput = withStyles((theme) => ({
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
    minWidth: "150px",
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

const renderInputComponent = (inputProps) => {
  return <BootstrapInput {...inputProps} />;
};

/**
 * Input de autocompletado para las instituciones, despliega una lista para seleccionar instituciones registradas
 */
const InstitucionesAutocomplete = ({
  list,
  event,
  onChangeEvent,
  withStrict,
  defaultValue,
}) => {
  // local
  var classes = useStyles();

  const [selected, setSelected] = useState("");
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [originalList, setOriginalList] = useState(null);

  const getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0
      ? []
      : matchSorter(originalList, value, {
          keys: ["nombre"],
        });
  };

  const getSuggestionValue = useCallback(
    (suggestion) => {
      event && event(suggestion.id);
      setSelected(suggestion.nombre);
      return suggestion.nombre;
    },
    [setSelected, event],
  );
  // const getSuggestionValue = suggestion => {
  //   event && event(suggestion.id);
  //   setSelected(suggestion.nombre);
  //   return suggestion.nombre;
  // };

  const renderSuggestion = (suggestion) => <div>{suggestion.nombre}</div>;

  const onChange = (event, { newValue }) => {
    onChangeEvent && onChangeEvent(newValue);
    setValue(newValue);
  };

  const onBlur = () => {
    if (selected === "" && withStrict) {
      event && event(null);
      setValue("");
    }
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  useEffect(() => {
    if (selected !== "" && selected !== value) {
      setSelected("");
    }
    if (originalList !== list) {
      setOriginalList(list);
    }
    if (value === "" && defaultValue) {
      setValue(getSuggestionValue(defaultValue));
    }
  }, [
    selected,
    value,
    withStrict,
    list,
    originalList,
    defaultValue,
    getSuggestionValue,
  ]);

  const inputProps = {
    placeholder: "Ingrese la institución",
    value,
    onChange: onChange,
    onBlur: onBlur,
  };
  return (
    <React.Fragment>
      <div className={classes.inputContainer}>
        <InstitucionIcon />
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
    </React.Fragment>
  );
};

export default InstitucionesAutocomplete;
