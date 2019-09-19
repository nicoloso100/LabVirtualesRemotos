import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  Fade,
  Backdrop,
  TextField,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  CircularProgress,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
//

import { Send as SendIcon, Add as AddIcon } from "@material-ui/icons";
// styles
import useStyles from "./styles";
import InstitucionesAutocomplete from "../InstitucionesAutoComplete/InstitucionesAutocomplete";
import { getInstituciones } from "../../services/DatosInicialesServices";
import { ShowNotification } from "../../utils/utils";
import {
  INVALID_FIELD,
  INSTITUCION_ADD_SUCCESS,
} from "../../constants/notificationConstanst";
import { saveInstitucion } from "../../services/peticionesServices";

const RemoveMessage = ({ index, item, itemList, setItem, classes }) => {
  const onItemChanged = text => {
    let setItemList = [...itemList];
    setItemList[index] = { ...item, mensaje: text };
    setItem(setItemList);
  };

  return (
    <div className={classes.correosList}>
      <label className={classes.ListField}>{item.email}</label>
      <TextField
        id="filled-multiline-flexible"
        label="Mensaje..."
        multiline
        value={item.mensaje}
        onChange={arg => onItemChanged(arg.target.value)}
        className={classes.ListField}
        margin="normal"
        variant="filled"
      />
    </div>
  );
};

const AddMessage = ({ data, instituciones, item, classes }) => {
  const getInstitucion = email => {
    return data.find(item => item.email === email);
  };

  const getSelected = selected => {
    console.log(selected);
  };

  return (
    <TableRow>
      <TableCell>{item.email}</TableCell>
      <TableCell>{getInstitucion(item.email).institucion}</TableCell>
      <TableCell>
        <InstitucionesAutocomplete
          event={getSelected}
          list={instituciones}
          withStrict={true}
        />
      </TableCell>
    </TableRow>
  );
};

const constructDeleteList = list => {
  let constList = [];
  list.forEach(element => {
    constList.push({ email: element, mensaje: "" });
  });
  return constList;
};

const PeticionesModals = ({ data, params, setOpen, request }) => {
  var classes = useStyles();
  const fullScreen = useMediaQuery(useTheme().breakpoints.down("xl"));
  const [list, setList] = useState([]);
  const [instituciones, setInstituciones] = useState(null);
  const [addInstitucion, setAddInstitucion] = useState(false);
  const [newInstValue, setNewInstValue] = useState("");
  var [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setList(constructDeleteList(params.list));
    if (instituciones === null) {
      getInstituciones().then(res => {
        setInstituciones(res);
      });
    }
  }, [instituciones, params.list]);

  const postSaveInstitucion = () => {
    if (newInstValue !== "") {
      saveInstitucion(newInstValue, setIsLoading).then(res => {
        ShowNotification(INSTITUCION_ADD_SUCCESS);
        setAddInstitucion(false);
        setInstituciones(null);
      });
    } else {
      ShowNotification(INVALID_FIELD);
    }
    setNewInstValue("");
  };

  return (
    <React.Fragment>
      <Dialog
        open={addInstitucion}
        onClose={() => setAddInstitucion(false)}
        fullScreen={true}
        maxWidth={"xl"}
      >
        <DialogTitle id="form-dialog-title">Agregar institución</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Ingresa el nombre de la institución que deseas agregar
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Nombre de la institución"
            fullWidth
            value={newInstValue}
            onChange={arg => setNewInstValue(arg.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddInstitucion(false)} color="primary">
            Cancelar
          </Button>
          {isLoading ? (
            <CircularProgress size={26} className={classes.loginLoader} />
          ) : (
            <Button onClick={() => postSaveInstitucion()} color="primary">
              Guardar
            </Button>
          )}
        </DialogActions>
      </Dialog>

      <Dialog
        open={params.open}
        onClose={() => setOpen({ ...params, open: false })}
      >
        <DialogContent>
          {params.option === 0 ? (
            <React.Fragment>
              <h2 id="transition-modal-title">
                Escribe un mensaje con el motivo de rechazo
              </h2>
              <p id="transition-modal-description">
                Los usuarios recibirán por correo elecrónico el mensaje:
              </p>
              {list.map((item, index) => {
                return (
                  <RemoveMessage
                    key={index}
                    classes={classes}
                    index={index}
                    item={item}
                    itemList={list}
                    setItem={setList}
                  />
                );
              })}
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={() => request(list)}
              >
                Enviar
                <SendIcon />
              </Button>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <h2 id="transition-modal-title">
                Ingresa la institución del usuario
              </h2>
              <p id="transition-modal-description">
                valida la institución que registró el usuario, si no existe
                puedes crearla
              </p>
              <Button
                variant="contained"
                onClick={() => setAddInstitucion(true)}
              >
                Crear Institución
                <AddIcon />
              </Button>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Email</TableCell>
                    <TableCell align="center">Institución sugerida</TableCell>
                    <TableCell align="center">Vincular institución</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {list.map((item, index) => {
                    return (
                      <AddMessage
                        key={index}
                        data={data}
                        classes={classes}
                        item={item}
                        instituciones={instituciones}
                      />
                    );
                  })}
                  {list.map((item, index) => {
                    return (
                      <AddMessage
                        key={index}
                        data={data}
                        classes={classes}
                        item={item}
                        instituciones={instituciones}
                      />
                    );
                  })}
                  {list.map((item, index) => {
                    return (
                      <AddMessage
                        key={index}
                        data={data}
                        classes={classes}
                        item={item}
                        instituciones={instituciones}
                      />
                    );
                  })}
                  {list.map((item, index) => {
                    return (
                      <AddMessage
                        key={index}
                        data={data}
                        classes={classes}
                        item={item}
                        instituciones={instituciones}
                      />
                    );
                  })}
                  {list.map((item, index) => {
                    return (
                      <AddMessage
                        key={index}
                        data={data}
                        classes={classes}
                        item={item}
                        instituciones={instituciones}
                      />
                    );
                  })}
                  {list.map((item, index) => {
                    return (
                      <AddMessage
                        key={index}
                        data={data}
                        classes={classes}
                        item={item}
                        instituciones={instituciones}
                      />
                    );
                  })}
                  {list.map((item, index) => {
                    return (
                      <AddMessage
                        key={index}
                        data={data}
                        classes={classes}
                        item={item}
                        instituciones={instituciones}
                      />
                    );
                  })}
                  {list.map((item, index) => {
                    return (
                      <AddMessage
                        key={index}
                        data={data}
                        classes={classes}
                        item={item}
                        instituciones={instituciones}
                      />
                    );
                  })}
                </TableBody>
              </Table>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                //onClick={() => request(list)}
              >
                Enviar
                <SendIcon />
              </Button>
            </React.Fragment>
          )}
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export default PeticionesModals;
