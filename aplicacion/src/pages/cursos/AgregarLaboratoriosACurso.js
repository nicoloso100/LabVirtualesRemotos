import React, { useEffect, useState, useCallback } from "react";
import PageTitle from "../../components/PageTitle/PageTitle";
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
  getCursosLaboratorios,
  saveCursoLaboratorios,
} from "../../services/cursosServices";
import { useUserState } from "../../context/UserContext";
import VincularLaboratorios from "./VincularLaboratorios";
import { NotificationManager } from "react-notifications";

const useStyles = makeStyles(theme => ({
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
  body: {
    flexDirection: "column",
  },
}));

const AgregarLaboratoriosACurso = () => {
  var user = useUserState();
  const classes = useStyles();
  const [cursos, setCursos] = useState(null);
  const [expanded, setExpanded] = React.useState(false);

  const getInfoLaboratorios = useCallback(() => {
    getCursosLaboratorios(user.email).then(res => {
      setCursos(res.data);
    });
  }, [user]);

  useEffect(() => {
    getInfoLaboratorios();
  }, [getInfoLaboratorios]);

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const saveLaboratorios = (labList, idCurso) => {
    saveCursoLaboratorios(labList, idCurso).then(res => {
      NotificationManager.success(res);
      getInfoLaboratorios();
    });
  };

  return (
    <React.Fragment>
      <PageTitle
        title="Agregar laboratorios a laboratorios"
        onButtonClick={() => {}}
      />
      <Typography>
        A continuación despliegue el laboratorio al cual desea modificar los
        laboratorios asociados
      </Typography>
      <br />
      {cursos !== null && (
        <div className={classes.root}>
          {cursos.map(curso => {
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
                <ExpansionPanelDetails className={classes.body}>
                  <VincularLaboratorios
                    defaultList={curso.laboratorios}
                    onSave={labList => saveLaboratorios(labList, curso.id)}
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

export default AgregarLaboratoriosACurso;
