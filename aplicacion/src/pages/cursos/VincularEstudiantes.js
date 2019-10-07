import React from "react";
import { Typography, Button, withStyles } from "@material-ui/core";
import useStyles from "./styles";
import { green } from "@material-ui/core/colors";

const ColorButton = withStyles(theme => ({
  root: {
    color: "white",
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700],
    },
  },
}))(Button);

const VincularEstudiantes = ({ setStep, nextStep, previousStep }) => {
  var classes = useStyles();

  const onBackClick = () => {
    setStep(2);
    previousStep();
  };

  const onSaveClick = () => {};

  return (
    <React.Fragment>
      <Typography className={classes.StepTitle}>
        Vincular estudiantes al curso
      </Typography>
      <div className={classes.ImgButtonContainer}>
        <Button
          variant="contained"
          className={classes.button}
          onClick={onBackClick}
        >
          Regresar
        </Button>
        <ColorButton
          onClick={onSaveClick}
          variant="contained"
          color="primary"
          className={classes.margin}
        >
          Guardar
        </ColorButton>
      </div>
    </React.Fragment>
  );
};

export default VincularEstudiantes;
