import React, { useState, useEffect, useCallback } from "react";
import PageTitle from "../../components/PageTitle/PageTitle";
import { Typography, Grid, Paper } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

//Services
import { getProfesoresDetallado } from "../../services/profesoresService";
import DataTableComponent from "../../components/DataTable/DataTable";
import useStyles from "./styles";

const columns = [
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
  {
    name: "Institución",
    selector: "director.institucion.nombre",
    sortable: true,
  },
  {
    name: "Director",
    cell: row => (
      <div>
        {row.director.usuario.name} {row.director.usuario.surname}
      </div>
    ),
    sortable: true,
  },
];

const ExpandedComponent = ({ data, classes }) => {
  console.log(data);
  return (
    <div className={classes.customTableColor}>
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
    </div>
  );
};

const ProfesoresDetallado = () => {
  var classes = useStyles();
  const [profesoresArray, setProfesoresArray] = useState(null);

  const fillProfesores = useCallback(() => {
    getProfesoresDetallado().then(res => {
      setProfesoresArray(res);
    });
  }, []);

  useEffect(() => {
    if (profesoresArray === null) {
      fillProfesores();
    }
  }, [fillProfesores, profesoresArray]);

  return (
    <React.Fragment>
      <PageTitle title="Profesores" />
      <Typography>
        A continuación se muestra la lista de todos los profesores inscritos en
        la plataforma:
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

export default ProfesoresDetallado;
