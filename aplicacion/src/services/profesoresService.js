import { profesoresURLs } from "../constants/URLs";
import swal from "sweetalert";
import { baseError } from "../constants/notificationConstanst";
import showLoading from "../components/loadingIcon/loading";

const axios = require("axios");

export const getProfesores = email => {
  showLoading(true);
  return new Promise(resolve => {
    axios
      .post(profesoresURLs.getProfesores, { email: email })
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

export const addProfesor = (email, director, setIsLoading) => {
  setIsLoading(true);
  return new Promise(resolve => {
    axios
      .post(profesoresURLs.addProfesor, {
        email: email,
        director: director,
      })
      .then(res => {
        setIsLoading(false);
        resolve(res.data);
      })
      .catch(err => {
        setIsLoading(false);
        var error = err.response;
        swal("Oops!", error ? error.data : baseError, "warning");
      });
  });
};

export const getProfesoresDetallado = () => {
  showLoading(true);
  return new Promise(resolve => {
    axios
      .post(profesoresURLs.getProfesoresDetallado)
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

export const getProfesoresDetalladoPorDirector = email => {
  showLoading(true);
  return new Promise(resolve => {
    axios
      .post(profesoresURLs.getProfesoresDetalladoPorDirector, { email: email })
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
