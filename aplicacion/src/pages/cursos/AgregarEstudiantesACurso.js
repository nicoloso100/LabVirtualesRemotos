import React, { useEffect, useState } from "react";
import PageTitle from "../../components/PageTitle/PageTitle";
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { getCursos } from "../../services/cursosServices";
import { useUserState } from "../../context/UserContext";
import VincularEstudiantes from "./VincularEstudiantes";

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
}));

const AgregarEstudiantesACursos = ({ informacionCurso }) => {
  var user = useUserState();
  const classes = useStyles();
  const [cursos, setCursos] = useState(null);
  const [expanded, setExpanded] = React.useState(false);

  useEffect(() => {
    getCursos(user.email).then(res => {
      setCursos(res.data);
    });
  }, [user]);

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <React.Fragment>
      <PageTitle
        title="Agregar estudiantes a laboratorios"
        onButtonClick={() => {}}
      />
      <Typography>
        A continuación despliegue el curso al cual desea modificar los
        estudiantes inscritos
      </Typography>
      <br />
      {cursos !== null && (
        <div className={classes.root}>
          {cursos.map(curso => {
            console.log(curso);
            return (
              <ExpansionPanel
                key={curso.id}
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
                    defaultList={[]}
                    onAdd={config => console.log(config)}
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
