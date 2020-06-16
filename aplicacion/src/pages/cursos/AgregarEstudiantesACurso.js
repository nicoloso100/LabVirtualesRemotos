import React, { useEffect, useState, useCallback } from "react";
import PageTitle from "../../components/PageTitle/PageTitle";
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
  getCursosEstudiantes,
  saveCursoEstudiante,
  deleteCursoEstudiante,
} from "../../services/cursosServices";
import { useUserState } from "../../context/UserContext";
import VincularEstudiantes from "./VincularEstudiantes";
import { NotificationManager } from "react-notifications";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  accordion: {
    backgroundColor: "#F1F1F1",
  },
}));

/**
 * Sección para agregar estudiantes a los diferentes cursos que tenga creado el docente
 */

const AgregarEstudiantesACursos = () => {
  var user = useUserState();
  const classes = useStyles();
  const [cursos, setCursos] = useState(null);
  const [expanded, setExpanded] = React.useState(false);

  const getInfoCursos = useCallback(() => {
    getCursosEstudiantes(user.email).then((res) => {
      setCursos(res.data);
    });
  }, [user]);

  useEffect(() => {
    getInfoCursos();
  }, [getInfoCursos]);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const addEstudianteCurso = (emailAlumno, idCurso) => {
    saveCursoEstudiante({
      emailAlumno,
      idCurso,
    }).then((res) => {
      NotificationManager.success(res);
      getInfoCursos();
    });
  };

  const removeEstudianteCurso = (alumnosList, idCurso) => {
    deleteCursoEstudiante(alumnosList, idCurso).then((res) => {
      getInfoCursos();
    });
  };

  return (
    <React.Fragment>
      <PageTitle
        title="Agregar estudiantes a cursos"
        onButtonClick={() => {}}
      />
      <Typography>
        A continuación despliegue el curso al cual desea modificar los
        estudiantes inscritos
      </Typography>
      <br />
      {cursos !== null && (
        <div className={classes.root}>
          {cursos.map((curso) => {
            return (
              <ExpansionPanel
                key={curso.id}
                className={classes.accordion}
                expanded={expanded === curso.id}
                onChange={handleChange(curso.id)}
              >
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Typography className={classes.heading}>
                    {curso.nombre}
                  </Typography>
                  <Typography className={classes.secondaryHeading}>
                    {curso.descripcion}
                  </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <VincularEstudiantes
                    defaultList={curso.alumnos}
                    onAdd={(alumno) => addEstudianteCurso(alumno, curso.id)}
                    onRemove={(alumnosList) =>
                      removeEstudianteCurso(alumnosList, curso.id)
                    }
                  />
                </ExpansionPanelDetails>
              </ExpansionPanel>
            );
          })}
        </div>
      )}
    </React.Fragment>
  );
};

export default AgregarEstudiantesACursos;
