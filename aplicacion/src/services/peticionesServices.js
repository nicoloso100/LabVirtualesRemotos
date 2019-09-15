import { peticionesURLs } from "../constants/URLs";
import swal from "sweetalert";
import { baseError } from "../constants/notificationConstanst";
import showLoading from "../components/loadingIcon/loading";

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
