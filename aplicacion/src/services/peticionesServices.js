import { peticionesURLs } from "../constants/URLs";
import swal from "sweetalert";
import { baseError } from "../constants/notificationConstanst";
import showLoading from "../components/loadingIcon/loading";
import { createMessageList } from "../utils/utils";

const axios = require("axios");

export const getPeticiones = () => {
  showLoading(true);
  return new Promise(resolve => {
    axios
      .post(peticionesURLs.getAdmins)
      .then(res => {
        resolve(res.data);
        showLoading(false);
      })
      .catch(err => {
        showLoading(false);
        var error = err.response;
        swal("Oops!", error ? error.data : baseError, "warning");
      });
  });
};

export const rejectPeticiones = peticiones => {
  showLoading(true);
  return new Promise(resolve => {
    let promises = [];
    let results = [];
    peticiones.forEach(peticion => {
      promises.push(
        axios.post(peticionesURLs.rejectPeticiones, {
          email: peticion.email,
          mensaje: peticion.mensaje,
        }),
      );
    });
    axios
      .all(promises)
      .then(res => {
        res.forEach(result => {
          results.push(result.data);
        });
        showLoading(false);
        swal({
          title: "Resultado de la operación:",
          content: createMessageList(results),
          type: "success",
          icon: "success",
        });
        resolve();
      })
      .catch(err => {
        showLoading(false);
        var error = err.response;
        swal("Oops!", error ? error.data : baseError, "warning");
      });
  });
};

export const acceptPeticiones = peticiones => {
  showLoading(true);
  return new Promise(resolve => {
    let promises = [];
    let results = [];
    peticiones.forEach(peticion => {
      promises.push(
        axios.post(peticionesURLs.acceptPeticiones, {
          email: peticion.email,
          institucion: peticion.institucion,
        }),
      );
    });
    axios
      .all(promises)
      .then(res => {
        res.forEach(result => {
          results.push(result.data);
        });
        showLoading(false);
        swal({
          title: "Resultado de la operación:",
          content: createMessageList(results),
          type: "success",
          icon: "success",
        });
        resolve();
      })
      .catch(err => {
        showLoading(false);
        var error = err.response;
        swal("Oops!", error ? error.data : baseError, "warning");
      });
  });
};

export const saveInstitucion = (institucion, setIsLoading) => {
  setIsLoading(true);
  return new Promise(resolve => {
    axios
      .post(peticionesURLs.saveInstitucion, {
        nombre: institucion,
      })
      .then(res => {
        resolve(res.data);
        setIsLoading(false);
      })
      .catch(err => {
        setIsLoading(false);
        var error = err.response;
        swal("Oops!", error ? error.data : baseError, "warning");
      });
  });
};
