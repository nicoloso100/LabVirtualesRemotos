import { initialDataURLs } from "../constants/URLs";
import swal from "sweetalert";
import { baseError } from "../constants/notificationConstanst";
import { signOut } from "./loginServices";
import showLoading from "../components/loadingIcon/loading";

const axios = require("axios");

export const getDatosIniciales = (
  email,
  userDispatch,
  infoUserDispatch,
  history,
) => {
  showLoading(true);
  axios
    .post(initialDataURLs.getDatosIniciales, { email: email })
    .then(res => {
      showLoading(false);
      infoUserDispatch({
        type: "INFO_SUCCESS",
        name: res.data.name,
        surname: res.data.surname,
        rol: res.data.rol,
      });
    })
    .catch(err => {
      showLoading(false);
      var error = err.response;
      swal("Oops!", error ? error.data : baseError, "warning").then(() => {
        signOut(userDispatch, infoUserDispatch, history);
      });
    });
};

export const getUsuarios = (userRol, strict) => {
  showLoading(true);
  let params = {
    rol: userRol,
  };
  if (strict) {
    params = { ...params, strict: true };
  }
  return new Promise((resolve, reject) => {
    axios
      .post(initialDataURLs.getUsuarios, params)
      .then(res => {
        showLoading(false);
        resolve(res.data);
      })
      .catch(err => {
        showLoading(false);
        var error = err.response;
        swal("Oops!", error ? error.data : baseError, "warning");
      });
  });
};

export const getInstituciones = () => {
  showLoading(true);
  return new Promise((resolve, reject) => {
    axios
      .post(initialDataURLs.getInstituciones)
      .then(res => {
        showLoading(false);
        resolve(res.data);
      })
      .catch(err => {
        showLoading(false);
        var error = err.response;
        swal("Oops!", error ? error.data : baseError, "warning");
      });
  });
};
