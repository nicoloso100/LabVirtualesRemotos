import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { ThemeProvider } from "@material-ui/styles";
import { CssBaseline } from "@material-ui/core";

import Themes from "./themes";
import * as serviceWorker from "./serviceWorker";
import { LayoutProvider } from "./context/LayoutContext";
import { UserProvider } from "./context/UserContext";

import "react-notifications/lib/notifications.css";
import { NotificationContainer } from "react-notifications";
import App from "./App";

ReactDOM.render(
  <LayoutProvider>
    <UserProvider>
      <ThemeProvider theme={Themes.default}>
        <CssBaseline />
        <App />
        <NotificationContainer />
      </ThemeProvider>
    </UserProvider>
  </LayoutProvider>,
  document.getElementById("root"),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
