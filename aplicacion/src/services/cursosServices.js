import { cursosURLs } from "../constants/URLs";
import swal from "sweetalert";
import { baseError } from "../constants/notificationConstanst";
import showLoading from "../components/loadingIcon/loading";

const axios = require("axios");

export const getCursos = email => {
  showLoading(true);
  return new Promise(resolve => {
    axios
      .post(cursosURLs.getCursos, { profesor: email })
      .then(res => {
        showLoading(false);
        resolve(res);
      })
      .catch(err => {
        showLoading(false);
        var error = err.response;
        swal("Oops!", error ? error.data : baseError, "warning");
      });
  });
};

export const saveCurso = newCurso => {
  showLoading(true);
  return new Promise(resolve => {
    axios
      .post(cursosURLs.saveCurso, newCurso)
      .then(res => {
        showLoading(false);
        swal("Ok!", res.data, "success");
        resolve();
      })
      .catch(err => {
        showLoading(false);
        var error = err.response;
        swal("Oops!", error ? error.data : baseError, "warning");
      });
  });
};

export const deleteCurso = idCurso => {
  showLoading(true);
  return new Promise(resolve => {
    axios
      .post(cursosURLs.deleteCurso, { idCurso: idCurso })
      .then(res => {
        showLoading(false);
        swal("Ok!", res.data, "success");
        resolve();
      })
      .catch(err => {
        showLoading(false);
        var error = err.response;
        swal("Oops!", error ? error.data : baseError, "warning");
      });
  });
};
