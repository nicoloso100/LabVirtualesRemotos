import React, { useState, useEffect, useRef } from "react";
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import Modal from "react-modal";
import { sendInfo } from "../../services/infoServices";
// styles
import useStyles from "./styles";
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Divider,
  Typography,
  Grid,
  TextField,
  Button,
  CircularProgress,
} from "@material-ui/core";

import {
  AssignmentInd as DirectorIcon,
  AccountCircle as ProfesorIcon,
  Face as EstudianteIcon,
  Message as MensajeIcon,
  Send as EnviarIcon,
} from "@material-ui/icons";
import { useUserState } from "../../context/UserContext";
import { IsNotEmptyField, ShowNotification } from "../../utils/utils";
import { INVALID_FIELD } from "../../constants/notificationConstanst";
import InstitucionesAutocomplete from "../../components/InstitucionesAutoComplete/InstitucionesAutocomplete";
import { getInstituciones } from "../../services/DatosInicialesServices";
import swal from "sweetalert";
import profesor1 from "../../assets/info/profesor-1.png";
import profesor2 from "../../assets/info/profesor-2.png";
import estudiante1 from "../../assets/info/estudiante-1.png";
import estudiante2 from "../../assets/info/estudiante-2.png";

/**
 * Sección para mostrar la ayuda de la página, se muestra un tutorial de como obtener una cuenta de estudiante, profesor o director, esta página solo se muestra en el rol de visitante
 */
const Info = (props) => {
  //local
  const classes = useStyles();
  const el = useRef(null);

  useEffect(() => {
    Modal.setAppElement(el.current);
  });

  const [slidePane, setSlidePane] = useState({
    open: false,
    title: "",
    component: undefined,
  });

  const ListTitle = ({ text }) => {
    return <Typography className={classes.ListTittle}>{text}</Typography>;
  };

  const setCloseSlidePanel = () => {
    setSlidePane({ ...slidePane, open: false });
  };

  return (
    <div ref={el}>
      <SlidingPane
        ariaHideApp={false}
        title={slidePane.title}
        className={classes.SlidePanel}
        isOpen={slidePane.open}
        onRequestClose={() => setCloseSlidePanel()}
      >
        {slidePane.component ? slidePane.component : <></>}
      </SlidingPane>

      <List className={classes.root}>
        <ListItem
          className={classes.ListItem}
          onClick={() =>
            setSlidePane({
              open: true,
              title: "Soy Director",
              component: <SoyDirector onFinish={setCloseSlidePanel} />,
            })
          }
        >
          <ListItemAvatar>
            <Avatar>
              <DirectorIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={<ListTitle text="Soy Director" />}
            secondary="Para comenzar a utilizar nuestra plataforma se debe solicitar una cuenta de director"
          />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem
          className={classes.ListItem}
          onClick={() =>
            setSlidePane({
              open: true,
              title: "Soy Profesor",
              component: <SoyProfesor classes={classes} />,
            })
          }
        >
          <ListItemAvatar>
            <Avatar>
              <ProfesorIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={<ListTitle text="Soy Profesor" />}
            secondary="¿Interesado en aplicar nuevas tecnologías a tus clases? Solicite al director de su carrera una cuenta de profesor"
          />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem
          className={classes.ListItem}
          onClick={() =>
            setSlidePane({
              open: true,
              title: "Soy Estudiante",
              component: <SoyEstudiante classes={classes} />,
            })
          }
        >
          <ListItemAvatar>
            <Avatar>
              <EstudianteIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={<ListTitle text="Soy Estudiante" />}
            secondary="¿Le interesaría realizar laboratorios de física en sus clases? Incentive a su docente en utilizar nuestra plataforma"
          />
        </ListItem>
      </List>
    </div>
  );
};

const SoyDirector = ({ onFinish }) => {
  //Global
  var { email } = useUserState();

  //Local
  const classes = useStyles();
  var [institucion, setInstitucion] = useState("");
  var [instituciones, setInstituciones] = useState(null);
  var [mensaje, setMensaje] = useState("");
  var [isLoading, setIsLoading] = useState(false);

  const sendInformation = (institucion, mensaje, setIsLoading) => {
    if (IsNotEmptyField(institucion) && IsNotEmptyField(mensaje)) {
      sendInfo(email, institucion, mensaje, setIsLoading).then((res) => {
        swal(
          "Ok!",
          "La solicitud se ha enviado correctamente, esté atento al correo para notificarle el estado de su solicitud",
          "success",
        );
        setMensaje("");
        onFinish();
      });
    } else {
      ShowNotification(INVALID_FIELD);
    }
  };

  useEffect(() => {
    if (instituciones === null) {
      getInstituciones().then((res) => {
        setInstituciones(res);
      });
    }
  }, [instituciones]);

  return (
    <React.Fragment>
      <Typography>
        Para crear una cuenta como director escriba los siguientes datos, una
        vez los hayamos confirmado enviaremos un correo notificando la respuesta
        y automáticamente tendrá acceso a las opciones de Director
      </Typography>
      <Typography className={classes.textMargin}>
        1) Ingresa el nombre de la institución a la que pertenece:
      </Typography>
      <Grid container spacing={1} alignItems="flex-end" justify="flex-start">
        <Grid item xs={10} sm={6}>
          <InstitucionesAutocomplete
            list={instituciones}
            onChangeEvent={setInstitucion}
            withStrict={false}
          />
        </Grid>
      </Grid>
      <Typography className={classes.textMargin}>
        2) Escríbenos un breve mensaje de cómo usará la aplicación:
      </Typography>
      <Grid container spacing={1} alignItems="flex-end" justify="flex-start">
        <Grid item>
          <MensajeIcon />
        </Grid>
        <Grid item xs={10} sm={6}>
          <TextField
            id="input-with-icon-grid"
            placeholder="Mensaje"
            value={mensaje}
            onChange={(arg) => setMensaje(arg.target.value)}
            fullWidth
            multiline
          />
        </Grid>
      </Grid>
      <Typography className={classes.textMargin}>
        3) Envíenos los datos, pronto recibirá una notificación en el correo
        electrónico con nuestra respuesta:
      </Typography>
      {isLoading ? (
        <CircularProgress size={26} className={classes.loginLoader} />
      ) : (
        <Button
          variant="contained"
          color="primary"
          className={classes.sendButton}
          onClick={() => sendInformation(institucion, mensaje, setIsLoading)}
        >
          Enviar
          <EnviarIcon />
        </Button>
      )}
    </React.Fragment>
  );
};

const SoyProfesor = ({ classes }) => {
  return (
    <React.Fragment>
      <Typography>
        Para tener una cuenta de profesor se requiere que el director de la
        carrera de la institución solicite una cuenta de Director.
      </Typography>
      <Typography>
        Una vez se tenga la cuenta de director, éste deberá agregar su correo en
        la lista de profesores de la siguiente manera:
      </Typography>
      <br />
      <Typography>1) Dirigirse al panel de Profesores</Typography>
      <br />
      <div className={classes.imageContainer}>
        <img src={profesor1} alt="profesor1" className={classes.imageComp} />
      </div>
      <br />
      <Typography>
        2) Ingresar el email de su cuenta y oprimir el botón de agregar
      </Typography>
      <br />
      <div className={classes.imageContainer}>
        <img src={profesor2} alt="profesor2" className={classes.imageComp} />
      </div>
      <br />
      <Typography>
        Una vez sea agregado a la lista de profesores, recargue la página o
        cierre sesión y vuelva a ingresar y ya tendrá los beneficios de una
        cuenta de Profesor
      </Typography>
    </React.Fragment>
  );
};

const SoyEstudiante = ({ classes }) => {
  return (
    <React.Fragment>
      <Typography>
        Para tener una cuenta de estudiante se requiere que un profesor lo
        inscriba a un curso de la siguiente forma:
      </Typography>
      <br />
      <Typography>
        Cuando el profesor va a crear un curso nuevo y usted se encuentra en ese
        curso, al momento de crear el curso tendrá un paso donde vincule los a
        estudiantes, en este paso él deberá ingresar su correo a la lista de
        inscritos
      </Typography>
      <br />
      <div className={classes.imageContainer}>
        <img
          src={estudiante1}
          alt="estudiante1"
          className={classes.imageComp}
        />
      </div>
      <br />
      <Typography>
        Cuando el profesor ya tiene un curso creado y usted pertenece a ese
        curso, deberá agregarlo a la lista de estudiantes del curso en la página
        "Cursos Alumnos"
      </Typography>
      <br />
      <div className={classes.imageContainer}>
        <img
          src={estudiante2}
          alt="estudiante2"
          className={classes.imageComp}
        />
      </div>
      <br />
      <Typography>
        Finalmente, cuando su correo sea agregado mediante cualquiera de las dos
        opciones, deberá recargar la página o cerrar sesión y volver a ingresar
        y su cuenta ya tandrá los beneficios del Estudiante
      </Typography>
    </React.Fragment>
  );
};

export default Info;
