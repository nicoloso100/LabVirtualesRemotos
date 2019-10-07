import React, { useState, useMemo } from "react";
import { Typography, Button, withStyles, Grid } from "@material-ui/core";
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

const VincularEstudiantes = ({ setStep, previousStep }) => {
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
    estudianteList.forEach(element => {
      let newArray = [...estudiantesArray].filter(obj => {
        return obj.email !== element;
      });
      setEstudiantesArray(newArray);
    });
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
      <div className={classes.EstudiantesContainer}>
        <UsersAutocomplete event={addStudent} noValidation />
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
      </div>
    </React.Fragment>
  );
};

export default VincularEstudiantes;
