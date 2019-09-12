import React, { useState, useEffect } from "react";

import UsersAutocomplete from "../../components/General/UsersAutocomplete";
import PageTitle from "../../components/PageTitle/PageTitle";
import { Grid, Typography } from "@material-ui/core";
import MUIDataTable from "mui-datatables";

// styles
//import useStyles from "./styles";

//Services
import { getAdmins } from "../../services/adminsServices";

const Admins = () => {
  const [adminArray, setAdminArray] = useState(null);

  const columns = [
    {
      name: "usuario.email",
      label: "Email",
    },
    {
      name: "usuario.name",
      label: "Nombres",
    },
    {
      name: "usuario.surname",
      label: "Apellidos",
    },
  ];

  useEffect(() => {
    if (adminArray === null) {
      getAdmins().then(res => {
        setAdminArray(res);
      });
    }
  }, [adminArray]);

  //var classes = useStyles();
  return (
    <React.Fragment>
      <PageTitle title="Administradores" />
      <Typography>
        Para agregar un administrador escriba y seleccione su respectivo correo
        en la barra de búsqueda. Solo los usuarios con rol Visitante pueden ser
        promovidos a Administradores, por lo tanto si ya posee una cuenta con
        otro rol en nuestra plataforma, deberá crear una nueva.
      </Typography>
      <UsersAutocomplete />
      <br />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          {adminArray !== null && (
            <MUIDataTable
              title="Lista de administradores"
              data={adminArray}
              columns={columns}
              options={{
                filterType: "checkbox",
              }}
            />
          )}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Admins;
