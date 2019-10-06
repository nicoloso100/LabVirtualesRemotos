import React from "react";
import { Button } from "@material-ui/core";
import { withRouter } from "react-router-dom";

// styles
import useStyles from "./styles";

// components
import { Typography } from "../Wrappers/Wrappers";

const PageTitle = withRouter(props => {
  var classes = useStyles();

  const setOnClick = () => {
    if (props.goToUrl) {
      props.history.push(props.goToUrl);
    } else if (props.onButtonClick) {
      props.onButtonClick();
    }
  };

  return (
    <div className={classes.pageTitleContainer}>
      <Typography className={classes.typo} variant="h1" size="sm">
        {props.title}
      </Typography>
      {props.button && (
        <Button
          classes={{ root: classes.button }}
          variant="contained"
          size="large"
          color="secondary"
          onClick={() => setOnClick()}
        >
          {props.button}
        </Button>
      )}
    </div>
  );
});

export default PageTitle;
