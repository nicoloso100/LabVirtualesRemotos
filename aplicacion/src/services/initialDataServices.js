import { loginURLs } from "../constants/URLs";
import swal from "sweetalert";
import { baseError } from "../constants/notificationConstanst";

const axios = require("axios");

export const sendPasswordRecover = (email, setIsResetLoading, handleClose) => {
  setIsResetLoading(true);
  axios
    .post(loginURLs.recoverPassword, { email: email })
    .then(res => {
      setIsResetLoading(false);
      handleClose();
      swal("Revisa tu correo!", res.data, "success");
    })
    .catch(err => {
      setIsResetLoading(false);
      var error = err.response;
      swal("Oops!", error ? error.data : baseError, "warning");
    });
};
