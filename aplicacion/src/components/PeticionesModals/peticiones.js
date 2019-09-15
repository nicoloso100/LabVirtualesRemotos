import React from "react";
import { Button, Modal, Fade, Backdrop, TextField } from "@material-ui/core";
//icons
import { Send as SendIcon } from "@material-ui/icons";
// styles
import useStyles from "./styles";

const PeticionesModals = ({ open, setOpen, option }) => {
  var classes = useStyles();

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={open}
      onClose={() => setOpen({ open: false, option })}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      disableAutoFocus={true}
    >
      <Fade in={open}>
        {option === 0 ? (
          <div className={classes.paper}>
            <h2 id="transition-modal-title">
              Escribe un mensaje con el motivo de rechazo
            </h2>
            <p id="transition-modal-description">
              Los usuarios recibirán por correo elecrónico el mensaje:
            </p>
            <TextField
              id="filled-multiline-flexible"
              label="Mensaje..."
              multiline
              // value={values.multiline}
              // onChange={handleChange('multiline')}
              className={classes.textField}
              margin="normal"
              variant="filled"
            />
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
            >
              Enviar
              <SendIcon />
            </Button>
          </div>
        ) : (
          <div className={classes.paper}>
            <h2 id="transition-modal-title">
              Ingresa la institución del usuario
            </h2>
            <p id="transition-modal-description">
              valida la institución que registró el usuario, si no existe puedes
              crearla
            </p>
          </div>
        )}
      </Fade>
    </Modal>
  );
};

export default PeticionesModals;
