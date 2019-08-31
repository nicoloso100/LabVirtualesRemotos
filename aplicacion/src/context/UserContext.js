import React from "react";
import { loginURLs } from "../constants/URLs";
import swal from "sweetalert";

const axios = require("axios");

var UserStateContext = React.createContext();
var UserDispatchContext = React.createContext();

const baseError = "Ha ocurrido un error, vuelve a intentarlo más tarde";

function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { ...state, isAuthenticated: true };
    case "SIGN_OUT_SUCCESS":
      return { ...state, isAuthenticated: false };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function UserProvider({ children }) {
  var [state, loginDispatch] = React.useReducer(userReducer, {
    isAuthenticated: !!localStorage.getItem("id_token"),
    error: null,
  });

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={loginDispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

function useUserState() {
  var context = React.useContext(UserStateContext);
  if (context === undefined) {
    throw new Error("useUserState must be used within a UserProvider");
  }
  return context;
}

function useUserDispatch() {
  var context = React.useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error("useUserDispatch must be used within a UserProvider");
  }
  return context;
}

export {
  UserProvider,
  useUserState,
  useUserDispatch,
  loginUser,
  signIn,
  signOut,
};

// ###########################################################

function loginUser(
  dispatch,
  login,
  password,
  history,
  setIsLoading,
  setPasswordValue,
) {
  setIsLoading(true);
  if (!!login && !!password) {
    axios
      .post(loginURLs.getToken, { username: login, password: password })
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
}

function signIn(name, login, password, setIsLoading, setPasswordValue) {
  setIsLoading(true);
  if (!!login && !!password) {
    axios
      .post(loginURLs.addUser, {
        name: name,
        username: login,
        password: password,
      })
      .then(res => {
        setIsLoading(false);
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
}

function signOut(dispatch, history) {
  localStorage.removeItem("id_token");
  dispatch({ type: "SIGN_OUT_SUCCESS" });
  history.push("/ingreso");
}
