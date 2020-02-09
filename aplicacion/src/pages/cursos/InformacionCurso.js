import React, { useState, useEffect } from "react";
import { Title, Message, Today } from "@material-ui/icons";
import {
  TextField,
  Button,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@material-ui/core";
import FormImage from "../../assets/images/sign-form.png";
import useStyles from "./styles";
import { ShowNotification } from "../../utils/utils";
import { INVALID_FIELD } from "../../constants/notificationConstanst";

const InformacionCurso = ({ setStep, nextStep, setConfig, config }) => {
  var classes = useStyles();
  const year = new Date().getFullYear() - 5;
  const years = Array.from(new Array(20), (val, index) => index + year);
  const periodos = ["01", "02", "03", "04"];

  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [selectedYear, setSelectedYear] = useState(year);
  const [selectedPeriodo, setSelectedPeriodo] = useState(periodos[0]);

  useEffect(() => {
    setNombre(config.nombre);
    setDescripcion(config.descripcion);
    setSelectedYear(config.year);
    setSelectedPeriodo(config.periodo);
  }, [config]);

  const onClick = () => {
    if (validate()) {
      setConfig({
        nombre,
        descripcion,
        selectedYear,
        selectedPeriodo,
      });
      setStep(1);
      nextStep();
    } else {
      ShowNotification(INVALID_FIELD);
    }
  };

  const validate = () => {
    if (
      nombre === "" ||
      descripcion === "" ||
      selectedYear === "" ||
      selectedPeriodo === ""
    ) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <React.Fragment>
      <Typography className={classes.StepTitle}>
        Ingresa la información básica del curso
      </Typography>
      <div className={classes.InfoBasicaContainer}>
        <div className={classes.InfoContenedorForm}>
          <div className={classes.InputContainer}>
            <Title className={classes.InputIcon} />
            <TextField
              value={nombre}
              onChange={evt => setNombre(evt.target.value)}
              className={classes.Input}
              id="input-with-icon-grid"
              label="Nombre"
            />
          </div>
          <div className={classes.InputContainer}>
            <Message className={classes.InputIcon} />
            <TextField
              multiline
              value={descripcion}
              onChange={evt => setDescripcion(evt.target.value)}
              className={classes.Input}
              id="input-with-icon-grid"
              label="Descripción"
            />
          </div>
          <div className={classes.InputContainer}>
            <Today className={classes.InputIcon} />
            <FormControl className={classes.formControl}>
              <InputLabel>Año</InputLabel>
              <Select
                value={selectedYear}
                onChange={evt => setSelectedYear(evt.target.value)}
                className={classes.Input}
              >
                {years.map((item, index) => {
                  return (
                    <MenuItem key={index} value={item}>
                      {item}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
          <div className={classes.InputContainer}>
            <Today className={classes.InputIcon} />
            <FormControl className={classes.formControl}>
              <InputLabel>Periodo</InputLabel>
              <Select
                value={selectedPeriodo}
                onChange={evt => setSelectedPeriodo(evt.target.value)}
                className={classes.Input}
              >
                {periodos.map((item, index) => {
                  return (
                    <MenuItem key={index} value={item}>
                      {item}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
          <br />
          <Button
            variant="contained"
            className={classes.button}
            onClick={onClick}
          >
            Continuar
          </Button>
        </div>
        <div className={classes.InfoContenedorImagen}>
          <img className={classes.InfoImage} src={FormImage} alt="Form"></img>
        </div>
      </div>
    </React.Fragment>
  );
};

export default InformacionCurso;
