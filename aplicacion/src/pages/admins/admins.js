import React, { useState, useEffect, useMemo } from "react";
import UsersAutocomplete from "../../components/UsersAutoComplete/UsersAutocomplete";
import PageTitle from "../../components/PageTitle/PageTitle";
import { Grid, Typography } from "@material-ui/core";

//styles
import useStyles from "./styles";

//Services
import { getAdmins, addAdmin } from "../../services/adminsServices";
import { ShowNotification } from "../../utils/utils";
import DataTable from "../../components/DataTable/DataTable";

const Admins = () => {
  var classes = useStyles();
  const [adminArray, setAdminArray] = useState(null);

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

  useEffect(() => {
    if (adminArray === null) {
      getAdmins().then(res => {
        setAdminArray(res);
      });
    }
  }, [adminArray]);

  const createAdmin = (selected, setIsLoading, setValue) => {
    addAdmin(selected, setIsLoading).then(response => {
      ShowNotification({ type: "success", message: response });
      setValue("");
    });
  };

  return (
    <React.Fragment>
      <PageTitle title="Administradores" />
      <Typography>
        Para agregar un administrador escriba y seleccione su respectivo correo
        en la barra de búsqueda. Solo los usuarios con rol Visitante pueden ser
        promovidos a Administradores, por lo tanto si ya posee una cuenta con
        otro rol en nuestra plataforma, deberá crear una nueva.
      </Typography>
      <UsersAutocomplete event={createAdmin} />
      <br />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          {adminArray !== null && (
            <DataTable data={adminArray} columns={columns} />
          )}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Admins;
