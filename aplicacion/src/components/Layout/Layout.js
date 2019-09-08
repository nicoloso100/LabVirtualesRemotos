import React, { useEffect } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import classnames from "classnames";

// styles
import useStyles from "./styles";

// components
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";

// pages
import Dashboard from "../../pages/dashboard/Dashboard";
import Tables from "../../pages/tables/Tables";
import Info from "../../pages/info/Info";

//icons
import { Home as HomeIcon, Announcement as InfoIcon } from "@material-ui/icons";

// context
import { useLayoutState } from "../../context/LayoutContext";
import {
  useInfoUserState,
  useUserState,
  useInfoUserDispatch,
  useUserDispatch,
} from "../../context/UserContext";
import { getInitialData } from "../../services/initialDataServices";

function Layout(props) {
  var classes = useStyles();

  // global
  var infoUserDispatch = useInfoUserDispatch();
  var userDispatch = useUserDispatch();
  var layoutState = useLayoutState();
  var { email } = useUserState();
  var userInfo = useInfoUserState();

  useEffect(() => {
    if (email && userInfo.rol === "") {
      getInitialData(email, infoUserDispatch, userDispatch, props.history);
    }
  });

  const structureBase = {
    slider: [
      { id: 0, label: "Inicio", link: "/app/dashboard", icon: <HomeIcon /> },
    ],
    route: [{ path: "/app/dashboard", component: Dashboard }],
  };

  const structureVisitante = {
    slider: [
      { id: 0, label: "Inicio", link: "/app/dashboard", icon: <HomeIcon /> },
      { id: 2, label: "Información", link: "/app/info", icon: <InfoIcon /> },
    ],
    route: [
      { path: "/app/dashboard", component: Dashboard },
      { path: "/app/info", component: Info },
    ],
  };

  const getStructure = () => {
    switch (userInfo.rol) {
      case "visitante":
        return structureVisitante;

      default:
        return structureBase;
    }
  };

  return userInfo.rol !== "" ? (
    <div className={classes.root}>
      <>
        <Header history={props.history} />
        <Sidebar structure={getStructure().slider} />
        <div
          className={classnames(classes.content, {
            [classes.contentShift]: layoutState.isSidebarOpened,
          })}
        >
          <div className={classes.fakeToolbar} />
          <Switch>
            {getStructure().route.map((route, index) => {
              return (
                <Route
                  key={index}
                  path={route.path}
                  component={route.component}
                />
              );
            })}
          </Switch>
        </div>
      </>
    </div>
  ) : null;
}

export default withRouter(Layout);
