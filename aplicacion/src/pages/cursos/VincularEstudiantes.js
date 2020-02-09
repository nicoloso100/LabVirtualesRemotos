import React, { useState, useMemo } from "react";
import { Typography, Button, withStyles, Grid, Paper } from "@material-ui/core";
import useStyles from "./styles";
import { green } from "@material-ui/core/colors";
import UsersAutocomplete from "../../components/UsersAutoComplete/UsersAutocomplete";
import DataTableComponent from "../../components/DataTable/DataTable";

const ColorButton = withStyles(theme => ({
  root: {
    color: "white",
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700],
    },
  },
}))(Button);

const VincularEstudiantes = ({
  setStep,
  previousStep,
  setConfig,
  saveAllConfig,
}) => {
  var classes = useStyles();
  const [estudiantesArray, setEstudiantesArray] = useState([]);

  const columns = useMemo(
    () => [
      {
        name: "Email",
        selector: "email",
        sortable: true,
      },
    ],
    [],
  );

  const onBackClick = () => {
    setStep(2);
    previousStep();
  };

  const addStudent = (selected, setIsLoading, setValue) => {
    let list = [...estudiantesArray];
    list.push({ email: selected });
    setEstudiantesArray(list);
    setValue("");
  };

  const delEstudiante = estudianteList => {
    let editArray = [...estudiantesArray];
    estudianteList.forEach(element => {
      let newArray = editArray.filter(obj => {
        return obj.email !== element;
      });
      editArray = newArray;
    });
    setEstudiantesArray(editArray);
  };

  const onSaveClick = () => {
    setConfig(estudiantesArray);
    saveAllConfig();
  };

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
      <Paper className={classes.EstudiantesContainer}>
        <UsersAutocomplete event={addStudent} userRol={2} noValidation />
        <br />
        {estudiantesArray.length > 0 && (
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <DataTableComponent
                title="Estudiantes seleccionados"
                data={estudiantesArray}
                columns={columns}
                selectedEvent={delEstudiante}
              />
            </Grid>
          </Grid>
        )}
      </Paper>
    </React.Fragment>
  );
};

export default VincularEstudiantes;
