import React, { useEffect, useState, useMemo } from "react";
import PageTitle from "../../components/PageTitle/PageTitle";
import { Typography } from "../../components/Wrappers/Wrappers";
import { Grid, Button } from "@material-ui/core";
import DataTableComponent from "../../components/DataTable/DataTable";
import InstitucionesAutocomplete from "../../components/InstitucionesAutoComplete/InstitucionesAutocomplete";

// styles
import useStyles from "./styles";

//Services
import { getDirectores } from "../../services/directoresServices";
import { getInstituciones } from "../../services/DatosInicialesServices";

/**
 * Página para listar, agregar o eliminar directores, esta solo se puede acceder desde el rol de administrador
 */
const Directores = () => {
  var classes = useStyles();
  const [directoresArray, setDirectoresArray] = useState(null);
  const [instituciones, setInstituciones] = useState(null);
  const [institucionSelected, setInstitucionSelected] = useState(null);

  const columns = useMemo(
    () => [
      {
        name: "Email",
        selector: "email",
        sortable: true,
        grow: 2,
      },
      {
        name: "Institucion",
        selector: "institucion.nombre",
        sortable: true,
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
    ],
    [],
  );

  const fetchDirectores = (institucion) => {
    getDirectores(institucion).then((response) => {
      setDirectoresArray(response);
    });
  };

  useEffect(() => {
    if (directoresArray === null) {
      fetchDirectores();
    }
    if (instituciones === null) {
      getInstituciones().then((response) => {
        setInstituciones(response);
      });
    }
  }, [directoresArray, instituciones]);

  const selectInstitucion = (selected) => {
    setInstitucionSelected(selected);
  };

  const delDirectores = (list) => {
    console.log(list);
  };

  return (
    <React.Fragment>
      <PageTitle title="Directores" />
      <Typography>Lista de los directores activos e inscritos</Typography>
      <Typography>Buscar por institución: </Typography>
      <div className={classes.FiltroContenedor}>
        <InstitucionesAutocomplete
          list={instituciones}
          event={selectInstitucion}
          withStrict={true}
        />
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={() => fetchDirectores(institucionSelected)}
        >
          Buscar
        </Button>
      </div>
      <br />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          {directoresArray !== null && (
            <DataTableComponent
              title="Lista de directores"
              data={directoresArray}
              columns={columns}
              selectedEvent={delDirectores}
            />
          )}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Directores;
