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

  return userInfo.rol !== "" ? (
    <div className={classes.root}>
      <>
        <Header history={props.history} />
        <Sidebar />
        <div
          className={classnames(classes.content, {
            [classes.contentShift]: layoutState.isSidebarOpened,
          })}
        >
          <div className={classes.fakeToolbar} />
          <Switch>
            <Route path="/app/dashboard" component={Dashboard} />
            <Route path="/app/tables" component={Tables} />
          </Switch>
        </div>
      </>
    </div>
  ) : null;
}

export default withRouter(Layout);
