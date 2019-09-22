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

const Info = props => {
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

  return (
    <div ref={el}>
      <SlidingPane
        ariaHideApp={false}
        title={slidePane.title}
        className={classes.SlidePanel}
        isOpen={slidePane.open}
        onRequestClose={() => setSlidePane({ ...slidePane, open: false })}
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
              component: <SoyDirector />,
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
            secondary="Únete a nuestra plataforma, te creamos una cuenta de director"
          />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem
          className={classes.ListItem}
          onClick={() =>
            setSlidePane({
              open: true,
              title: "Soy Profesor",
              component: <SoyProfesor />,
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
            secondary="¿Interesado en aplicar nuevas tecnologías a tus clases? Píde a tu director tu cuenta de profesor"
          />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem
          className={classes.ListItem}
          onClick={() =>
            setSlidePane({
              open: true,
              title: "Soy Estudiante",
              component: <SoyEstudiante />,
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
            secondary="¿Te interesaría realizar laboratorios de física? "
          />
        </ListItem>
      </List>
    </div>
  );
};

const SoyDirector = () => {
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
      sendInfo(email, institucion, mensaje, setIsLoading).then(res => {
        ShowNotification({ type: "success", message: res });
        setInstitucion("");
        setMensaje("");
      });
    } else {
      ShowNotification(INVALID_FIELD);
    }
  };

  useEffect(() => {
    if (instituciones === null) {
      getInstituciones().then(res => {
        setInstituciones(res);
      });
    }
  }, [instituciones]);

  return (
    <React.Fragment>
      <Typography>
        Para crear tu cuenta como director, envíanos los siguientes datos, una
        vez los hayamos confirmado enviaremos un correo notificándote y
        automáticamente tendrás acceso a las opciones de Director
      </Typography>
      <Typography className={classes.textMargin}>
        1) Ingresa el nombre de la institución a la que perteneces:
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
        2) Escríbenos un mensjae de cómo usarás la aplicación:
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
            onChange={arg => setMensaje(arg.target.value)}
            fullWidth
            multiline
          />
        </Grid>
      </Grid>
      <Typography className={classes.textMargin}>
        3) Envíanos los datos, pronto recibirás una notificación en tu correo
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

const SoyProfesor = () => {
  return <Typography>Profesor info</Typography>;
};

const SoyEstudiante = () => {
  return <Typography>Estudiante info</Typography>;
};

export default Info;
