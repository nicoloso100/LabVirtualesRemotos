import React, { useState } from "react";
import { Title, Message } from "@material-ui/icons";
import {
  Grid,
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

const InformacionCurso = ({ setStep, nextStep }) => {
  var classes = useStyles();
  const year = new Date().getFullYear();
  const years = Array.from(new Array(20), (val, index) => index + year);
  const [selectedYear, setSelectedYear] = useState(year);

  const onClick = () => {
    setStep(1);
    nextStep();
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
              className={classes.Input}
              id="input-with-icon-grid"
              label="Nombre"
            />
          </div>
          <div className={classes.InputContainer}>
            <Message className={classes.InputIcon} />
            <TextField
              multiline
              className={classes.Input}
              id="input-with-icon-grid"
              label="Descripción"
            />
          </div>
          <div className={classes.InputContainer}>
            <Message className={classes.InputIcon} />
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
