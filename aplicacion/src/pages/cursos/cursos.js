import React, { useState, useEffect, useMemo } from "react";
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
  Grid,
} from "@material-ui/core";
import { Close as CloseIcon } from "@material-ui/icons";
import InformacionCurso from "./InformacionCurso";
import ImagenCurso from "./ImagenCurso";
import VincularLaboratorios from "./VincularLaboratorios";
import VincularEstudiantes from "./VincularEstudiantes";
import { useUserState } from "../../context/UserContext";
import {
  saveCurso,
  editCurso,
  getCursos,
  deleteCurso,
} from "../../services/cursosServices";
import { baseURL } from "../../constants/URLs";
import WidgetCursos from "../../components/Widget/WidgetCursos";
import { getDataUri } from "../../utils/utils";
import showLoading from "../../components/loadingIcon/loading";
import swal from "sweetalert";

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
  ImagenCurso: "",
  VincularLaboratorios: [],
  VincularEstudiantes: [],
  Profesor: "",
};

const Cursos = () => {
  //global
  var user = useUserState();

  const constructDefaultConfig = useMemo(() => {
    return {
      ...defaultConfig,
      Profesor: user.email,
    };
  }, [user.email]);

  var classes = useStyles();
  const [cursos, setCursos] = useState(null);
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openEditConfirm, setOpenEditConfirm] = useState(false);
  const [openConfirmDelete, setOpenConfirmDelete] = useState({
    open: false,
    idCurso: null,
  });
  const [step, setStep] = useState(0);
  const [config, setConfig] = useState(constructDefaultConfig);

  useEffect(() => {
    if (cursos === null) {
      getCursosAction();
    }
  });

  const getCursosAction = () => {
    getCursos(user.email).then(res => {
      setCursos(res.data);
    });
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
  };

  const confirmSave = () => {
    saveCurso(config).then(() => {
      setConfig(constructDefaultConfig);
      getCursosAction();
      setOpen(false);
    });
    setOpenConfirm(false);
  };

  const confirmEdit = () => {
    editCurso(config).then(() => {
      setConfig(constructDefaultConfig);
      getCursosAction();
      setOpenEdit(false);
    });
    setOpenEditConfirm(false);
  };

  const confirmDelete = id => {
    deleteCurso(id).then(() => {
      getCursosAction();
      setOpenConfirmDelete({ ...openConfirmDelete, open: false });
    });
  };

  const cancelDelete = () => {
    setOpenConfirmDelete({ ...openConfirmDelete, open: false });
  };

  const onCreate = () => {
    setConfig(constructDefaultConfig);
    setOpen(true);
  };

  const onEdit = item => {
    showLoading(true);
    getDataUri(baseURL + item.imagen)
      .then(image => {
        setConfig({
          ...constructDefaultConfig,
          Id: item.id,
          InformacionCurso: {
            ...constructDefaultConfig.InformacionCurso,
            nombre: item.nombre,
            descripcion: item.descripcion,
            periodo: item.periodo,
            year: item.year,
          },
          ImagenCurso: image,
        });
        showLoading(false);
        setOpenEdit(true);
      })
      .catch(err => {
        showLoading(false);
        swal("Oops!", err, "warning");
      });
  };

  return (
    <React.Fragment>
      <PageTitle
        title="Cursos"
        button="Crear curso"
        onButtonClick={() => onCreate()}
      />
      <div>
        <Dialog
          fullScreen
          open={open}
          onClose={() => setOpen(false)}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={() => setOpen(false)}
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
            onClose={() => setOpenConfirm(false)}
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
              <Button onClick={() => setOpenConfirm(false)} color="primary">
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
              saveAllConfig={() => setOpenConfirm(true)}
            />
          </StepWizard>
        </Dialog>
      </div>

      <div>
        <Dialog
          fullScreen
          open={openEdit}
          onClose={() => setOpenEdit(false)}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={() => setOpenEdit(false)}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                Modificar Curso
              </Typography>
            </Toolbar>
          </AppBar>
          <Dialog
            open={openEditConfirm}
            TransitionComponent={Transition}
            keepMounted
            onClose={() => setOpenEditConfirm(false)}
          >
            <DialogTitle id="alert-dialog-slide-title">
              {"Atención"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                ¿Está seguro que desea modificar el curso?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenEditConfirm(false)} color="primary">
                Cancelar
              </Button>
              <Button onClick={confirmEdit} color="primary">
                Modificar
              </Button>
            </DialogActions>
          </Dialog>
          <div className={classes.StepperContainer}>
            <Stepper
              titleFontSize={12}
              steps={[
                { title: "Información básica" },
                { title: "Seleccionar imágen" },
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
              saveAllConfig={() => setOpenEditConfirm(true)}
            />
          </StepWizard>
        </Dialog>
      </div>

      <Dialog
        open={openConfirmDelete.open}
        TransitionComponent={Transition}
        keepMounted
        onClose={cancelDelete}
      >
        <DialogTitle id="alert-dialog-slide-title">{"Atención"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            ¿Está seguro que desea eliminar el curso?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete} color="primary">
            Cancelar
          </Button>
          <Button
            onClick={() => confirmDelete(openConfirmDelete.idCurso)}
            color="primary"
          >
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
      <Grid container spacing={4}>
        {cursos !== null &&
          cursos.map(item => {
            return (
              <Grid
                key={item.id}
                className={classes.gridCard}
                item
                lg={3}
                md={4}
                sm={6}
                xs={12}
              >
                <WidgetCursos
                  title={item.nombre}
                  subtitle={item.descripcion}
                  period={`${item.year}-${item.periodo}`}
                  setOnClick={() => onEdit(item)}
                  setOnDeleteClick={() =>
                    setOpenConfirmDelete({
                      open: true,
                      idCurso: item.id,
                    })
                  }
                  image={baseURL + item.imagen}
                  bodyClass={classes.fullHeightBody}
                  className={classes.cursosCard}
                />
              </Grid>
            );
          })}
      </Grid>
    </React.Fragment>
  );
};

export default Cursos;
