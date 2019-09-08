import { infoURLs } from "../constants/URLs";
import swal from "sweetalert";
import { baseError } from "../constants/notificationConstanst";

const axios = require("axios");

export const sendInfo = (email, institucion, mensaje, setIsLoading) => {
  setIsLoading(true);
  return new Promise(resolve => {
    axios
      .post(infoURLs.sendInfo, {
        email: email,
        institucion: institucion,
        mensaje: mensaje,
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
