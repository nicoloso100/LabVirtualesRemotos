import React from "react";

var UserStateContext = React.createContext();
var UserDispatchContext = React.createContext();

function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isAuthenticated: true,
        name: action.name,
        email: action.email,
      };
    case "SIGN_OUT_SUCCESS":
      return { ...state, isAuthenticated: false, name: "", email: "" };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function UserProvider({ children }) {
  const id_token = localStorage.getItem("id_token");
  const id_name = localStorage.getItem("id_name");
  const id_email = localStorage.getItem("id_email");
  var [state, loginDispatch] = React.useReducer(userReducer, {
    isAuthenticated: !!id_token,
    name: id_name ? id_name : "",
    email: id_email ? id_email : "",
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

export { UserProvider, useUserState, useUserDispatch };
