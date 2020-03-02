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
import Info from "../../pages/info/Info";
import Admins from "../../pages/admins/admins";

//icons
import {
  Home as HomeIcon,
  Announcement as InfoIcon,
  SupervisedUserCircle as AdminsIcon,
  NotificationsActive as PendingIcon,
  ViewList as DirectoresIcon,
  School as ProfesoresIcon,
  AddToQueue as CursosIcon,
  PersonAdd as AddAlumnoCursoIcon,
  LibraryAdd as AddLabCursoIcon,
} from "@material-ui/icons";

// context
import { useLayoutState } from "../../context/LayoutContext";
import {
  useInfoUserState,
  useUserState,
  useInfoUserDispatch,
  useUserDispatch,
} from "../../context/UserContext";
import { getDatosIniciales } from "../../services/DatosInicialesServices";
import Peticiones from "../../pages/peticiones/peticiones";
import Directores from "../../pages/directores/Directores";
import Profesores from "../../pages/profesores/Profesores";
import Cursos from "../../pages/cursos/cursos";
import AgregarEstudiantesACursos from "../../pages/cursos/AgregarEstudiantesACurso";
import AgregarLaboratoriosACurso from "../../pages/cursos/AgregarLaboratoriosACurso";
import DashboardAlumnos from "../../pages/dashboard/DashboardAlumnos";

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
      getDatosIniciales(email, userDispatch, infoUserDispatch, props.history);
    }
  });

  const structureBase = {
    slider: [
      { id: 0, label: "Inicio", link: "/app/dashboard", icon: <HomeIcon /> },
    ],
    route: [{ path: "/app/dashboard", component: Dashboard }],
  };

  const structureAdministrador = {
    slider: [
      { id: 0, label: "Inicio", link: "/app/dashboard", icon: <HomeIcon /> },
      {
        id: 1,
        label: "Administradores",
        link: "/app/admins",
        icon: <AdminsIcon />,
      },
      {
        id: 2,
        label: "Peticiones",
        link: "/app/peticiones",
        icon: <PendingIcon />,
      },
      {
        id: 3,
        label: "Directores",
        link: "/app/directores",
        icon: <DirectoresIcon />,
      },
    ],
    route: [
      { path: "/app/dashboard", component: Dashboard },
      { path: "/app/admins", component: Admins },
      { path: "/app/peticiones", component: Peticiones },
      { path: "/app/directores", component: Directores },
    ],
  };

  const structureDirector = {
    slider: [
      { id: 0, label: "Inicio", link: "/app/dashboard", icon: <HomeIcon /> },
      {
        id: 1,
        label: "Profesores",
        link: "/app/profesores",
        icon: <ProfesoresIcon />,
      },
    ],
    route: [
      { path: "/app/dashboard", component: Dashboard },
      { path: "/app/profesores", component: Profesores },
    ],
  };

  const structureVisitante = {
    slider: [
      { id: 0, label: "Inicio", link: "/app/dashboard", icon: <HomeIcon /> },
      { id: 1, label: "Información", link: "/app/info", icon: <InfoIcon /> },
    ],
    route: [
      { path: "/app/dashboard", component: Dashboard },
      { path: "/app/info", component: Info },
    ],
  };

  const structureProfesor = {
    slider: [
      { id: 0, label: "Inicio", link: "/app/dashboard", icon: <HomeIcon /> },
      { id: 1, label: "Cursos", link: "/app/cursos", icon: <CursosIcon /> },
      {
        id: 2,
        label: "Cursos alumnos",
        link: "/app/AgregarEstudiantesACursos",
        icon: <AddAlumnoCursoIcon />,
      },
      {
        id: 3,
        label: "Cursos laboratorios",
        link: "/app/AgregarLaboratoriosACursos",
        icon: <AddLabCursoIcon />,
      },
    ],
    route: [
      { path: "/app/dashboard", component: Dashboard },
      { path: "/app/cursos", component: Cursos },
      {
        path: "/app/AgregarEstudiantesACursos",
        component: AgregarEstudiantesACursos,
      },
      {
        path: "/app/AgregarLaboratoriosACursos",
        component: AgregarLaboratoriosACurso,
      },
    ],
  };

  const structureEstudiante = {
    slider: [
      { id: 0, label: "Inicio", link: "/app/dashboard", icon: <HomeIcon /> },
    ],
    route: [{ path: "/app/dashboard", component: DashboardAlumnos }],
  };

  const getStructure = () => {
    switch (userInfo.rol) {
      case "visitante":
        return structureVisitante;
      case "administrador":
        return structureAdministrador;
      case "director":
        return structureDirector;
      case "profesor":
        return structureProfesor;
      case "estudiante":
        return structureEstudiante;
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
