import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Box,
  AppBar,
  Tab,
  Tabs,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
} from "@material-ui/core";
// styles
import useStyles from "./styles";

// components
import Widget from "../../components/Widget/Widget";
import PageTitle from "../../components/PageTitle/PageTitle";
//import { Typography } from "../../components/Wrappers/Wrappers";
import { useInfoUserState, useUserState } from "../../context/UserContext";
import { getLaboratorios } from "../../services/dashboardServices";
import { baseURL } from "../../constants/URLs";
import { useTheme } from "@material-ui/styles";
import SwipeableViews from "react-swipeable-views";

const TabPanel = ({ children, value, index, ...other }) => {
  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}

export default function DashboardAlumnos(props) {
  var classes = useStyles();
  const theme = useTheme();

  //global
  var user = useUserState();
  var userInfo = useInfoUserState();

  //local
  const [infoAdicional, setInfoAdicional] = useState(null);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = index => {
    setValue(index);
  };

  useEffect(() => {
    if (infoAdicional === null) {
      getLaboratorios(user.email).then(res => {
        setInfoAdicional(res.data);
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
      {infoAdicional !== null && (
        <div className={classes.tabsContainer}>
          <AppBar position="static" color="default">
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="scrollable"
              scrollButtons="auto"
              aria-label="scrollable auto tabs example"
            >
              {infoAdicional.cursos.map((curso, index) => {
                return (
                  <Tab key={index} label={curso.nombre} {...a11yProps(index)} />
                );
              })}
            </Tabs>
          </AppBar>
          <SwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={value}
            onChangeIndex={handleChangeIndex}
          >
            {infoAdicional.cursos.map((curso, index) => {
              console.log(curso);
              return (
                <div key={index}>
                  {/* <div className={classes.bannerContainer}>
                    <div
                      className={classes.bannerImage}
                      style={{
                        backgroundImage: `url(${baseURL + curso.imagen})`,
                      }}
                    />
                    <Typography variant="h5">{curso.descripcion}</Typography>
                  </div> */}
                  <div className={classes.bannerContainer}>
                    <CardContent>
                      <div
                        className={classes.bannerImage}
                        style={{
                          backgroundImage: `url(${baseURL + curso.imagen})`,
                        }}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          {curso.descripcion}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          {curso.year} - {curso.periodo}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          {curso.profesor}
                        </Typography>
                      </CardContent>
                    </CardContent>
                  </div>

                  <TabPanel value={value} index={index}>
                    <Grid container spacing={4}>
                      {curso.laboratorios.map(item => {
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
                  </TabPanel>
                </div>
              );
            })}
          </SwipeableViews>
        </div>
      )}
    </>
  );
}
