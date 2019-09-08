import React, { useState } from "react";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

import { TextField, Button, CircularProgress } from "@material-ui/core";

// styles
import useStyles from "./styles";

const LoginModal = props => {
  const classes = useStyles();

  var [email, setLoginValue] = useState("");

  const recoverPassword = () => {
    props.handleSendPassword(email);
  };

  return (
    <Modal
      className={classes.modal}
      disableAutoFocus={true}
      open={props.open}
      onClose={props.handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={props.open}>
        <div className={classes.paper}>
          <h2>Recuperar contraseña</h2>
          <p>
            Para recuperar la contraseña escriba el correo o el nombre de
            usuario:
          </p>
          <TextField
            id="email"
            InputProps={{
              classes: {
                underline: classes.textFieldUnderline,
                input: classes.textField,
              },
            }}
            value={email}
            onChange={e => setLoginValue(e.target.value)}
            margin="normal"
            placeholder="Usuario o correo electrónico"
            type="email"
            fullWidth
          />
          <br />
          <br />
          {props.isResetLoading ? (
            <CircularProgress size={26} />
          ) : (
            <Button
              onClick={() => recoverPassword()}
              disabled={email.length === 0}
              size="large"
              variant="contained"
              color="primary"
              fullWidth
              className={classes.createAccountButton}
            >
              Enviar
            </Button>
          )}
        </div>
      </Fade>
    </Modal>
  );
};

export default LoginModal;
