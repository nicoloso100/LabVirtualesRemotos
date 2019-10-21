import React, { useState } from "react";
import PageTitle from "../../components/PageTitle/PageTitle";
import StepWizard from "react-step-wizard";
import Stepper from "react-stepper-horizontal";

// styles
import useStyles from "./styles";
import {
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Slide,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@material-ui/core";
import { Close as CloseIcon } from "@material-ui/icons";
import InformacionCurso from "./InformacionCurso";
import ImagenCurso from "./ImagenCurso";
import VincularLaboratorios from "./VincularLaboratorios";
import VincularEstudiantes from "./VincularEstudiantes";
import { useUserState } from "../../context/UserContext";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const defaultConfig = {
  InformacionCurso: {
    nombre: "",
    descripcion: "",
    year: "",
    periodo: "",
  },
  ImagenCurso: {},
  VincularLaboratorios: [],
  VincularEstudiantes: [],
  Profesor: "",
};

const Cursos = () => {
  //global
  var user = useUserState();

  var classes = useStyles();
  const [open, setOpen] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [step, setStep] = useState(0);
  const [config, setConfig] = useState({
    ...defaultConfig,
    Profesor: user.email,
  });

  const openCloseModal = open => {
    setOpen(open);
  };

  const onCrearCurso = () => {
    openCloseModal(true);
  };

  const modificaInformacionCurso = newConfig => {
    setConfig({
      ...config,
      InformacionCurso: {
        nombre: newConfig.nombre,
        descripcion: newConfig.descripcion,
        year: newConfig.selectedYear,
        periodo: newConfig.selectedPeriodo,
      },
    });
  };
  const modificaImagenCurso = newConfig => {
    setConfig({
      ...config,
      ImagenCurso: newConfig,
    });
  };
  const modificaVincularLaboratorios = newConfig => {
    setConfig({
      ...config,
      VincularLaboratorios: newConfig,
    });
  };
  const modificaVincularEstudiantes = newConfig => {
    setConfig({
      ...config,
      VincularEstudiantes: newConfig,
    });
    setOpenConfirm(true);
  };

  const confirmSave = () => {
    console.log(config);
    setOpenConfirm(false);
  };

  const cancelSave = () => {
    setOpenConfirm(false);
  };

  return (
    <React.Fragment>
      <PageTitle
        title="Cursos"
        button="Crear curso"
        onButtonClick={onCrearCurso}
      />
      <div>
        <Dialog
          fullScreen
          open={open}
          keepMounted
          onClose={() => openCloseModal(false)}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={() => openCloseModal(false)}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                Crear Curso
              </Typography>
            </Toolbar>
          </AppBar>
          <Dialog
            open={openConfirm}
            TransitionComponent={Transition}
            keepMounted
            onClose={cancelSave}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle id="alert-dialog-slide-title">
              {"Atención"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                ¿Está seguro que desea guardar el curso?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={cancelSave} color="primary">
                Cancelar
              </Button>
              <Button onClick={confirmSave} color="primary">
                Guardar
              </Button>
            </DialogActions>
          </Dialog>
          <div className={classes.StepperContainer}>
            <Stepper
              titleFontSize={12}
              steps={[
                { title: "Información básica" },
                { title: "Seleccionar imágen" },
                { title: "Vincular laboratorios" },
                { title: "Vincular estudiantes" },
              ]}
              activeStep={step}
            />
          </div>
          <StepWizard>
            <InformacionCurso
              setStep={setStep}
              setConfig={modificaInformacionCurso}
              config={config.InformacionCurso}
            />
            <ImagenCurso
              setStep={setStep}
              setConfig={modificaImagenCurso}
              config={config.ImagenCurso}
            />
            <VincularLaboratorios
              setStep={setStep}
              setConfig={modificaVincularLaboratorios}
              config={config.VincularLaboratorios}
            />
            <VincularEstudiantes
              setStep={setStep}
              setConfig={modificaVincularEstudiantes}
              config={config.VincularEstudiantes}
            />
          </StepWizard>
        </Dialog>
      </div>
    </React.Fragment>
  );
};

export default Cursos;
