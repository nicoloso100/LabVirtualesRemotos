import React, { useState } from "react";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

import { TextField, Button } from "@material-ui/core";

// styles
import useStyles from "./styles";

const LoginModal = props => {
  const classes = useStyles();

  var [loginValue, setLoginValue] = useState("");

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
            Para recuperar la contraseña escribe el correo o el nombre de
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
            value={loginValue}
            onChange={e => setLoginValue(e.target.value)}
            margin="normal"
            placeholder="Usuario o correo electrónico"
            type="email"
            fullWidth
          />
          <br />
          <br />
          <Button
            onClick={() => console.log(loginValue)}
            disabled={loginValue.length === 0}
            size="large"
            variant="contained"
            color="primary"
            fullWidth
            className={classes.createAccountButton}
          >
            Crear cuenta
          </Button>
        </div>
      </Fade>
    </Modal>
  );
};

export default LoginModal;
