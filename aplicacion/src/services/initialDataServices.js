import { initialDataURLs } from "../constants/URLs";
import swal from "sweetalert";
import { baseError } from "../constants/notificationConstanst";
import { signOut } from "./loginServices";
import showLoading from "../components/loadingIcon/loading";

const axios = require("axios");

export const getInitialData = (email, dispatch, errorDispatch, history) => {
  showLoading(true);
  axios
    .post(initialDataURLs.getInitialData, { email: email })
    .then(res => {
      showLoading(false);
      dispatch({
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
        signOut(errorDispatch, history);
      });
    });
};
