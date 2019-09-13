import React from "react";

var UserStateContext = React.createContext();
var UserDispatchContext = React.createContext();

function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isAuthenticated: true,
        email: action.email,
      };
    case "SIGN_OUT_SUCCESS":
      return { ...state, isAuthenticated: false, email: "" };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function userInfoReducer(state, action) {
  switch (action.type) {
    case "INFO_SUCCESS":
      return {
        name: action.name,
        surname: action.surname,
        rol: action.rol,
      };
    case "INFO_FAILED":
      return {
        name: "",
        surname: "",
        rol: "",
      };
    case "SIGN_OUT_SUCCESS":
      return { name: "", surname: "", rol: "" };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function UserProvider({ children }) {
  const id_token = localStorage.getItem("id_token");
  const id_email = localStorage.getItem("id_email");
  var [state, loginDispatch] = React.useReducer(userReducer, {
    isAuthenticated: !!id_token,
    email: id_email ? id_email : "",
  });

  var [info, infoDispatch] = React.useReducer(userInfoReducer, {
    name: "",
    surname: "",
    rol: "",
  });

  return (
    <UserStateContext.Provider
      value={{
        user: state,
        userInfo: info,
      }}
    >
      <UserDispatchContext.Provider
        value={{
          user: loginDispatch,
          userInfo: infoDispatch,
        }}
      >
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

function useUserState() {
  var context = React.useContext(UserStateContext).user;
  if (context === undefined) {
    throw new Error("useUserState must be used within a UserProvider");
  }
  return context;
}

function useInfoUserState() {
  var context = React.useContext(UserStateContext).userInfo;
  if (context === undefined) {
    throw new Error("useUserState must be used within a UserProvider");
  }
  return context;
}

function useUserDispatch() {
  var context = React.useContext(UserDispatchContext).user;
  if (context === undefined) {
    throw new Error("useUserDispatch must be used within a UserProvider");
  }
  return context;
}

function useInfoUserDispatch() {
  var context = React.useContext(UserDispatchContext).userInfo;
  if (context === undefined) {
    throw new Error("useUserDispatch must be used within a UserProvider");
  }
  return context;
}

export {
  UserProvider,
  useUserState,
  useInfoUserState,
  useUserDispatch,
  useInfoUserDispatch,
};
