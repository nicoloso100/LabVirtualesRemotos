import React, { useState } from "react";
import {
  Grid,
  CircularProgress,
  Typography,
  Button,
  Tabs,
  Tab,
  TextField,
} from "@material-ui/core";
import { withRouter } from "react-router-dom";

// styles
import useStyles from "./styles";

// logo
import logo from "./logo.svg";

// context
import { useUserDispatch } from "../../context/UserContext";
import LoginModal from "../../components/LoginModal/loginModal";
import {
  IsValidEmail,
  ShowNotification,
  IsNotEmptyField,
} from "../../utils/utils";
import {
  INVALID_EMAIL,
  INVALID_PASSWORD,
  INVALID_NAME,
} from "../../constants/notificationConstanst";
import {
  loginUser,
  signIn,
  sendPasswordRecover,
} from "../../services/loginServices";

function Login(props) {
  var classes = useStyles();

  // global
  var userDispatch = useUserDispatch();

  // local
  var [isLoading, setIsLoading] = useState(false);
  var [isResetLoading, setIsResetLoading] = useState(false);
  var [activeTabId, setActiveTabId] = useState(
    props.match.params.ruta === "1" ? 1 : 0,
  );
  var [nameValue, setNameValue] = useState("");
  var [surnameValue, setSurnameValue] = useState("");
  var [emailValue, setEmailValue] = useState("");
  var [passwordValue, setPasswordValue] = useState("");

  //Reset password modal
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const loginUserAction = () => {
    if (IsValidEmail(emailValue)) {
      if (IsNotEmptyField(passwordValue)) {
        loginUser(
          userDispatch,
          emailValue,
          passwordValue,
          props.history,
          setIsLoading,
          setPasswordValue,
        );
      } else {
        ShowNotification(INVALID_PASSWORD);
      }
    } else {
      ShowNotification(INVALID_EMAIL);
    }
  };

  const signInUserAction = () => {
    if (IsValidEmail(emailValue)) {
      if (IsNotEmptyField(passwordValue)) {
        if (IsNotEmptyField(nameValue) && IsNotEmptyField(surnameValue)) {
          signIn(
            nameValue,
            surnameValue,
            emailValue,
            passwordValue,
            setIsLoading,
            setPasswordValue,
          );
        } else {
          ShowNotification(INVALID_NAME);
        }
      } else {
        ShowNotification(INVALID_PASSWORD);
      }
    } else {
      ShowNotification(INVALID_EMAIL);
    }
  };

  const handleSendPassword = email => {
    if (IsValidEmail(email)) {
      sendPasswordRecover(email, setIsResetLoading, handleClose);
    } else {
      ShowNotification(INVALID_EMAIL);
    }
  };

  return (
    <React.Fragment>
      <LoginModal
        open={open}
        handleClose={handleClose}
        handleSendPassword={handleSendPassword}
        isResetLoading={isResetLoading}
      />
      <Grid container className={classes.container}>
        <div className={classes.logotypeContainer}>
          <img src={logo} alt="logo" className={classes.logotypeImage} />
          <Typography className={classes.logotypeText}>
            Laboratorios Virtuales Y Remotos
          </Typography>
        </div>
        <div className={classes.formContainer}>
          <div className={classes.form}>
            <Tabs
              value={activeTabId}
              onChange={(e, id) => setActiveTabId(id)}
              indicatorColor="primary"
              textColor="primary"
              centered
            >
              <Tab label="Ingreso" classes={{ root: classes.tab }} />
              <Tab label="Visitante" classes={{ root: classes.tab }} />
            </Tabs>
            {activeTabId === 0 && (
              <React.Fragment>
                <Typography variant="h1" className={classes.greeting}>
                  Bienvenido usuario!
                </Typography>
                <br />
                <Typography className={classes.formDividerWord}>
                  Para ingresar escriba sus datos de acceso
                </Typography>
                <TextField
                  id="email"
                  InputProps={{
                    classes: {
                      underline: classes.textFieldUnderline,
                      input: classes.textField,
                    },
                  }}
                  value={emailValue}
                  onChange={e => setEmailValue(e.target.value)}
                  margin="normal"
                  placeholder="Correo electrónico"
                  type="email"
                  fullWidth
                />
                <TextField
                  id="password"
                  InputProps={{
                    classes: {
                      underline: classes.textFieldUnderline,
                      input: classes.textField,
                    },
                  }}
                  value={passwordValue}
                  onChange={e => setPasswordValue(e.target.value)}
                  margin="normal"
                  placeholder="Contraseña"
                  type="password"
                  fullWidth
                />
                <div className={classes.formButtons}>
                  {isLoading ? (
                    <CircularProgress
                      size={26}
                      className={classes.loginLoader}
                    />
                  ) : (
                    <Button
                      disabled={
                        emailValue.length === 0 || passwordValue.length === 0
                      }
                      onClick={() => loginUserAction()}
                      variant="contained"
                      color="primary"
                      size="large"
                    >
                      Ingresar
                    </Button>
                  )}
                  <Button
                    color="primary"
                    size="large"
                    className={classes.forgetButton}
                    onClick={() => handleOpen()}
                  >
                    Recuperar Contraseña
                  </Button>
                </div>
              </React.Fragment>
            )}
            {activeTabId === 1 && (
              <React.Fragment>
                <Typography variant="h1" className={classes.greeting}>
                  ¿Listo para comenzar?
                </Typography>
                <br />
                <Typography variant="h2" className={classes.subGreeting}>
                  Ingresa los siguientes datos para crear tu cuenta de visitante
                </Typography>
                <TextField
                  id="name"
                  InputProps={{
                    classes: {
                      underline: classes.textFieldUnderline,
                      input: classes.textField,
                    },
                  }}
                  value={nameValue}
                  onChange={e => setNameValue(e.target.value)}
                  margin="normal"
                  placeholder="Nombre"
                  type="text"
                  fullWidth
                />
                <TextField
                  id="surname"
                  InputProps={{
                    classes: {
                      underline: classes.textFieldUnderline,
                      input: classes.textField,
                    },
                  }}
                  value={surnameValue}
                  onChange={e => setSurnameValue(e.target.value)}
                  margin="normal"
                  placeholder="Apellidos"
                  type="text"
                  fullWidth
                />
                <TextField
                  id="email"
                  InputProps={{
                    classes: {
                      underline: classes.textFieldUnderline,
                      input: classes.textField,
                    },
                  }}
                  value={emailValue}
                  onChange={e => setEmailValue(e.target.value)}
                  margin="normal"
                  placeholder="Correo Electrónico"
                  type="email"
                  fullWidth
                />
                <TextField
                  id="password"
                  InputProps={{
                    classes: {
                      underline: classes.textFieldUnderline,
                      input: classes.textField,
                    },
                  }}
                  value={passwordValue}
                  onChange={e => setPasswordValue(e.target.value)}
                  margin="normal"
                  placeholder="Contraseña"
                  type="password"
                  fullWidth
                />
                <div className={classes.creatingButtonContainer}>
                  {isLoading ? (
                    <CircularProgress size={26} />
                  ) : (
                    <Button
                      onClick={() => signInUserAction()}
                      disabled={
                        emailValue.length === 0 ||
                        passwordValue.length === 0 ||
                        nameValue.length === 0 ||
                        surnameValue.length === 0
                      }
                      size="large"
                      variant="contained"
                      color="primary"
                      fullWidth
                      className={classes.createAccountButton}
                    >
                      Crear cuenta
                    </Button>
                  )}
                </div>
              </React.Fragment>
            )}
          </div>
        </div>
      </Grid>
    </React.Fragment>
  );
}

export default withRouter(Login);
