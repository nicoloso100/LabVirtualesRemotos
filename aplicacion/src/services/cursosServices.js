import { cursosURLs } from "../constants/URLs";
import swal from "sweetalert";
import { baseError } from "../constants/notificationConstanst";
import showLoading from "../components/loadingIcon/loading";

const axios = require("axios");

export const saveCurso = newCurso => {
  console.log(newCurso);
  showLoading(true);
  return new Promise(resolve => {
    axios
      .post(cursosURLs.saveCurso, newCurso)
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
