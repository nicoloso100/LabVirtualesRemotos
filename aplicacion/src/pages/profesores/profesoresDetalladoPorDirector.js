import React, { useState, useEffect, useCallback, useMemo } from "react";
import PageTitle from "../../components/PageTitle/PageTitle";
import { Typography, Grid, Paper } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

//Services
import DataTableComponent from "../../components/DataTable/DataTable";
import useStyles from "./styles";
import { getProfesoresDetalladoPorDirector } from "../../services/profesoresService";
import { useUserState } from "../../context/UserContext";

const ExpandedComponent = ({ data, classes }) => {
  return (
    <div className={classes.customTableColor}>
      {data.curso.length > 0 ? (
        <TableContainer>
          <Table
            className={classes.table}
            size="small"
            aria-label="a dense table"
          >
            <TableHead>
              <TableRow>
                <TableCell>Curso #</TableCell>
                <TableCell align="right">Nombre</TableCell>
                <TableCell align="right">Descripcion</TableCell>
                <TableCell align="right">Año</TableCell>
                <TableCell align="right">Periodo</TableCell>
                <TableCell align="right">N° Estudiantes</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.curso.map((curso, index) => (
                <TableRow key={curso.id}>
                  <TableCell component="th" scope="curso">
                    {index + 1}
                  </TableCell>
                  <TableCell align="right">{curso.nombre}</TableCell>
                  <TableCell align="right">{curso.descripcion}</TableCell>
                  <TableCell align="right">{curso.year}</TableCell>
                  <TableCell align="right">{curso.periodo}</TableCell>
                  <TableCell align="right">{curso.alumnos.length}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography color="textSecondary" variant="subtitle2" component="h2">
          El profesor seleccionado no ha creado ningún curso
        </Typography>
      )}
    </div>
  );
};

/**
 * Sección para mostrar la información detallada de cada profesor, como cursos y alumnos vinculados, buscada mediante un director
 */

const ProfesoresDetalladoPorDirector = () => {
  //Global
  var { email } = useUserState();

  var classes = useStyles();

  const [profesoresArray, setProfesoresArray] = useState(null);

  const columns = useMemo(
    () => [
      {
        name: "Email",
        selector: "usuario.email",
        sortable: true,
        grow: 2,
      },
      {
        name: "Nombres",
        selector: "usuario.name",
        sortable: true,
      },
      {
        name: "Apellidos",
        selector: "usuario.surname",
        sortable: true,
      },
      {
        name: "Cursos",
        selector: "curso.length",
        sortable: true,
      },
    ],
    [],
  );

  const fillProfesores = useCallback(() => {
    getProfesoresDetalladoPorDirector(email).then((res) => {
      setProfesoresArray(res);
    });
  }, [email]);

  useEffect(() => {
    if (profesoresArray === null) {
      fillProfesores();
    }
  }, [fillProfesores, profesoresArray]);

  return (
    <React.Fragment>
      <PageTitle title="Profesores" />
      <Typography>
        A continuación se muestra la información detallada de los profesores
        relacionados con su cuenta de director:
      </Typography>
      <br />
      <Grid container spacing={4} component={Paper}>
        <Grid item xs={12}>
          {profesoresArray !== null && (
            <DataTableComponent
              title="Lista de profesores"
              data={profesoresArray}
              columns={columns}
              expandableRowsComponent={<ExpandedComponent classes={classes} />}
            />
          )}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default ProfesoresDetalladoPorDirector;
