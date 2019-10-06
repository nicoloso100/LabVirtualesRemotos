import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
// styles
import useStyles from "./styles";

// components
import Widget from "../../components/Widget/Widget";
import PageTitle from "../../components/PageTitle/PageTitle";
//import { Typography } from "../../components/Wrappers/Wrappers";
import { useInfoUserState, useUserState } from "../../context/UserContext";
import { getLaboratorios } from "../../services/dashboardServices";
import { baseURL } from "../../constants/URLs";

export default function Dashboard(props) {
  var classes = useStyles();

  //global
  var user = useUserState();
  var userInfo = useInfoUserState();

  //local
  const [laboratorios, setLaboratorios] = useState(null);

  useEffect(() => {
    if (laboratorios === null) {
      getLaboratorios(user.email).then(res => {
        setLaboratorios(res.data);
      });
    }
  });

  const onClick = link => {
    var win = window.open(link, "_blank");
    win.focus();
  };

  return (
    <>
      <PageTitle
        title="Laboratorios"
        button={
          userInfo.rol === "visitante" ? "Habilitar más laboratorios" : null
        }
        goToUrl="/app/info"
      />
      <Grid container spacing={4}>
        {laboratorios !== null &&
          laboratorios.map(item => {
            return (
              <Grid
                key={item.id}
                className={classes.gridCard}
                item
                lg={3}
                md={4}
                sm={6}
                xs={12}
              >
                <Widget
                  title={item.nombre}
                  setOnClick={() => onClick(item.link)}
                  image={baseURL + item.imagen}
                  bodyClass={classes.fullHeightBody}
                  className={classes.card}
                ></Widget>
              </Grid>
            );
          })}
      </Grid>
    </>
  );
}
