import React, { useState } from "react";
import {
  Grid,
  Dialog,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Slide,
  ButtonGroup,
} from "@material-ui/core";
// styles
import useStyles from "./styles";

// components
import Widget from "../../components/Widget/Widget";
//import { Typography } from "../../components/Wrappers/Wrappers";
import { baseURL } from "../../constants/URLs";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const LaboratorioList = ({ laboratorios }) => {
  var classes = useStyles();

  //local
  const [open, setOpen] = useState(false);
  const [selectedInfo, setSelectedInfo] = useState(null);

  const onClick = item => {
    setSelectedInfo(item);
    setOpen(true);
  };

  const iniciarClick = link => {
    var win = window.open(link, "_blank");
    win.focus();
  };

  const pdfClick = link => {
    var win = window.open(baseURL + link, "_blank");
    win.focus();
  };

  return (
    <>
      <Dialog
        TransitionComponent={Transition}
        onClose={() => setOpen(false)}
        open={open}
      >
        {selectedInfo !== null && (
          <Card className={classes.root}>
            <CardMedia
              component="img"
              alt="Contemplative Reptile"
              height="140"
              image={baseURL + selectedInfo.imagen}
              title="Contemplative Reptile"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {selectedInfo.nombre}
              </Typography>
              <Typography variant="subtitle1" component="h2">
                {selectedInfo.tema}
              </Typography>
              <Typography
                color="textSecondary"
                variant="subtitle2"
                component="h2"
              >
                {selectedInfo.descripcion}
              </Typography>
              <br />
              <Typography variant="body2" component="p">
                Objetivo: {selectedInfo.objetivo}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                variant="contained"
                color="primary"
                onClick={() => iniciarClick(selectedInfo.link)}
              >
                Iniciar
              </Button>
              <ButtonGroup
                size="small"
                color="primary"
                aria-label="small outlined button group"
              >
                <Button
                  className={classes.smallButtonText}
                  onClick={() => pdfClick(selectedInfo.guiaPractica)}
                >
                  Guia de práctica
                </Button>
                <Button
                  className={classes.smallButtonText}
                  onClick={() => pdfClick(selectedInfo.guiaDeMontaje)}
                >
                  Guía de montaje
                </Button>
                <Button
                  className={classes.smallButtonText}
                  onClick={() => pdfClick(selectedInfo.comoRecolectarDatos)}
                >
                  Cómo recolectar datos
                </Button>
              </ButtonGroup>
            </CardActions>
          </Card>
        )}
      </Dialog>
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
                  setOnClick={() => onClick(item)}
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
};

export default LaboratorioList;
