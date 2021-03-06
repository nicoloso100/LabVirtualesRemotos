import React from "react";
import { Paper, Typography } from "@material-ui/core";
import classnames from "classnames";

// styles
import useStyles from "./styles";

/**
 * Componente de card para mostrar los laboratorios
 */
export default function Widget({
  children,
  title,
  image,
  noBodyPadding,
  bodyClass,
  disableWidgetMenu,
  header,
  setOnClick,
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
        />
        <div className={classes.widgetHeader}>
          {header ? (
            header
          ) : (
            <React.Fragment>
              <Typography variant="h5" color="textSecondary">
                {title}
              </Typography>
            </React.Fragment>
          )}
        </div>
        <div
          className={classnames(classes.widgetBody, {
            [classes.noPadding]: noBodyPadding,
            [bodyClass]: bodyClass,
          })}
        >
          {children}
        </div>
      </Paper>
    </div>
  );
}
