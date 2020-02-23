import React, { useState, useMemo, useEffect } from "react";
import {
  Typography,
  Button,
  withStyles,
  Grid,
  Paper,
  Dialog,
  Slide,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core";
import useStyles from "./styles";
import { green } from "@material-ui/core/colors";
import UsersAutocomplete from "../../components/UsersAutoComplete/UsersAutocomplete";
import DataTableComponent from "../../components/DataTable/DataTable";
import { NotificationManager } from "react-notifications";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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
  defaultList,
  saveAllConfig,
  onAdd,
  onRemove,
}) => {
  var classes = useStyles();
  const [estudiantesArray, setEstudiantesArray] = useState([]);
  const [openAddConfirm, setOpenAddConfirm] = useState({
    open: false,
    callback: null,
  });

  useEffect(() => {
    if (defaultList) {
      setEstudiantesArray(defaultList);
    }
  }, [defaultList]);

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
    if (onAdd) {
      setOpenAddConfirm({
        open: true,
        callback: () => {
          onAdd(selected);
          setValue("");
          setOpenAddConfirm({ open: false, callback: null });
        },
      });
    } else {
      let exists = estudiantesArray.find(x => x.email === selected);
      if (exists) {
        NotificationManager.warning(
          "El estudiante seleccionado ya está agregado a  la lista",
        );
      } else {
        let list = [...estudiantesArray];
        list.push({ email: selected });
        setEstudiantesArray(list);
        setValue("");
      }
    }
  };

  const delEstudiante = estudianteList => {
    if (onRemove) {
      onRemove(estudianteList);
    } else {
      let editArray = [...estudiantesArray];
      estudianteList.forEach(element => {
        let newArray = editArray.filter(obj => {
          return obj.email !== element;
        });
        editArray = newArray;
      });
      setEstudiantesArray(editArray);
    }
  };

  const onSaveClick = () => {
    setConfig(estudiantesArray);
    saveAllConfig();
  };

  return (
    <React.Fragment>
      <Dialog
        open={openAddConfirm.open}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setOpenAddConfirm({ open: false, callback: null })}
      >
        <DialogTitle id="alert-dialog-slide-title">{"Atención"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            ¿Está seguro que desea agregar el nuevo estudiante al curso?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenAddConfirm({ open: false, callback: null })}
            color="primary"
          >
            Cancelar
          </Button>
          <Button onClick={() => openAddConfirm.callback()} color="primary">
            Agregar
          </Button>
        </DialogActions>
      </Dialog>
      {saveAllConfig && setStep && previousStep && (
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
      )}
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
