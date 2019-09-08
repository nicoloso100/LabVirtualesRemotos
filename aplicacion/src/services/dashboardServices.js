import { dashboardURLs } from "../constants/URLs";
import swal from "sweetalert";
import { baseError } from "../constants/notificationConstanst";
import showLoading from "../components/loadingIcon/loading";

const axios = require("axios");

export const getLaboratorios = email => {
  showLoading(true);
  return new Promise(resolve => {
    axios
      .post(dashboardURLs.getLaboratorios, { email: email })
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
