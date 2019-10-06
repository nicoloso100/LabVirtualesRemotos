import React, { useState } from "react";
import PageTitle from "../../components/PageTitle/PageTitle";
import StepWizard from "react-step-wizard";
import Stepper from "react-stepper-horizontal";

// styles
import useStyles from "./styles";
import {
  Button,
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Slide,
} from "@material-ui/core";
import { Close as CloseIcon } from "@material-ui/icons";
import InformacionCurso from "./InformacionCurso";
import ImagenCurso from "./ImagenCurso";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Cursos = () => {
  var classes = useStyles();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);

  const openCloseModal = open => {
    setOpen(open);
  };

  const onCrearCurso = () => {
    openCloseModal(true);
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
          open={true}
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
              <Button color="inherit" onClick={() => openCloseModal(false)}>
                Guardar
              </Button>
            </Toolbar>
          </AppBar>
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
            <InformacionCurso setStep={setStep} />
            <ImagenCurso setStep={setStep} />
          </StepWizard>
        </Dialog>
      </div>
    </React.Fragment>
  );
};

export default Cursos;
