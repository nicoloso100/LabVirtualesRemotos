import { loginURLs } from "../constants/URLs";
import swal from "sweetalert";
import { baseError } from "../constants/notificationConstanst";

const axios = require("axios");

export const loginUser = (
  dispatch,
  email,
  password,
  history,
  setIsLoading,
  setPasswordValue,
) => {
  setIsLoading(true);
  if (!!email && !!password) {
    axios
      .post(loginURLs.getToken, { email: email, password: password })
      .then(res => {
        setIsLoading(false);
        localStorage.setItem("id_token", res.token);
        dispatch({ type: "LOGIN_SUCCESS" });
        history.push("/app/dashboard");
      })
      .catch(err => {
        setIsLoading(false);
        setPasswordValue("");
        var error = err.response;
        swal("Oops!", error ? error.data : baseError, "warning");
      });
  } else {
    setIsLoading(false);
    setPasswordValue("");
    swal("Error!", baseError, "error");
  }
};

export const signIn = (
  name,
  email,
  password,
  setIsLoading,
  setPasswordValue,
) => {
  setIsLoading(true);
  if (!!email && !!password) {
    axios
      .post(loginURLs.addUser, {
        name: name,
        email: email,
        password: password,
      })
      .then(res => {
        setIsLoading(false);
        sendRegistratioEmail(email, name);
        swal("Bienvenido!", res.data, "success");
      })
      .catch(err => {
        setIsLoading(false);
        setPasswordValue("");
        var error = err.response;
        swal("Oops!", error ? error.data : baseError, "warning");
      });
  } else {
    setIsLoading(false);
    setPasswordValue("");
    swal("Error!", baseError, "error");
  }
};

export const signOut = (dispatch, history) => {
  localStorage.removeItem("id_token");
  dispatch({ type: "SIGN_OUT_SUCCESS" });
  history.push("/ingreso");
};

export const sendRegistratioEmail = (email, name) => {
  axios.post(loginURLs.sendSignInEmail, {
    email: email,
    name: name,
    title: "Tu registro ha sido exitoso!",
    text:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ac turpis tincidunt, convallis lorem consectetur, varius ipsum. Quisque mauris sem, tempus sit amet massa ac, efficitur tristique turpis. Aliquam maximus aliquam odio non facilisis. Mauris pellentesque blandit posuere.",
  });
};

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