import React from "react";
import { Paper, Typography, Fab } from "@material-ui/core";
import classnames from "classnames";
import { Delete as DeleteIcon } from "@material-ui/icons";

// styles
import useStyles from "./styles";

/**
 * Componente de card para mostrar los cursos
 */
export default function WidgetCursos({
  title,
  subtitle,
  period,
  image,
  bodyClass,
  setOnClick,
  setOnDeleteClick,
  ...props
}) {
  var classes = useStyles();

  return (
    <div className={classes.widgetWrapper}>
      <Paper
        className={classes.paper}
        classes={{ root: classes.widgetRoot }}
        onClick={() => setOnClick()}
      >
        <div
          className={classes.widgetImage}
          style={{ backgroundImage: `url(${image})` }}
        >
          <Fab
            color="secondary"
            size="small"
            aria-label="delete"
            onClick={(e) => {
              e.stopPropagation();
              setOnDeleteClick();
            }}
            className={classes.delIcon}
          >
            <DeleteIcon />
          </Fab>
        </div>
        <div className={classes.widgetHeaderSubtitle}>
          <Typography variant="h5" color="textSecondary">
            {title}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {subtitle}
          </Typography>
          <div className={classes.period}>
            <Typography variant="subtitle2" color="textSecondary">
              {period}
            </Typography>
          </div>
        </div>
        <div
          className={classnames(classes.widgetBody, {
            [bodyClass]: bodyClass,
          })}
        ></div>
      </Paper>
    </div>
  );
}
