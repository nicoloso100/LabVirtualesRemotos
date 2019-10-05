import React, { useState, useEffect, useMemo, useCallback } from "react";
import UsersAutocomplete from "../../components/UsersAutoComplete/UsersAutocomplete";
import PageTitle from "../../components/PageTitle/PageTitle";
import { Grid, Typography } from "@material-ui/core";

//Services
import { getProfesores, addProfesor } from "../../services/profesoresService";
import { ShowNotification } from "../../utils/utils";
import DataTableComponent from "../../components/DataTable/DataTable";
import { useUserState } from "../../context/UserContext";

const Profesores = () => {
  var { email } = useUserState();
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
    ],
    [],
  );

  const fillProfesores = useCallback(() => {
    getProfesores(email).then(res => {
      setProfesoresArray(res);
    });
  }, [email]);

  useEffect(() => {
    if (profesoresArray === null) {
      fillProfesores();
    }
  }, [fillProfesores, profesoresArray]);

  const createProfesor = (selected, setIsLoading, setValue) => {
    addProfesor(selected, email, setIsLoading).then(response => {
      ShowNotification({ type: "success", message: response });
      setValue("");
      fillProfesores();
    });
  };

  const delProfesor = adminList => {
    console.log(adminList);
  };

  return (
    <React.Fragment>
      <PageTitle title="Profesores" />
      <Typography>
        Para agregar un profesor escriba y seleccione su respectivo correo en la
        barra de búsqueda. Solo los usuarios con rol Visitante pueden ser
        promovidos a Profesores, por lo tanto si ya posee una cuenta con otro
        rol en nuestra plataforma, deberá crear una nueva.
      </Typography>
      <UsersAutocomplete event={createProfesor} />
      <br />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          {profesoresArray !== null && (
            <DataTableComponent
              title="Lista de profesores"
              data={profesoresArray}
              columns={columns}
              selectedEvent={delProfesor}
            />
          )}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Profesores;
