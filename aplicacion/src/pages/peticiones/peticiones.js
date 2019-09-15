import React from "react";
import PageTitle from "../../components/PageTitle/PageTitle";
import { Typography } from "@material-ui/core";

const Peticiones = () => {
  return (
    <React.Fragment>
      <PageTitle title="Peticiones para director" />
      <Typography>
        A continuación se mostrará la lista de peticiones pendientes por aprobar
        o rechazar para promover cuentas al rol de Director
      </Typography>
    </React.Fragment>
  );
};

export default Peticiones;
