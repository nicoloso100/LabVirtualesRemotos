import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
  widgetWrapper: {
    margin: "auto",
    maxWidth: "360px",
    display: "flex",
    minHeight: "100%",
  },
  widgetImage: {
    width: "100%",
    height: "150px",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  },
  widgetHeader: {
    padding: theme.spacing(3),
    paddingBottom: theme.spacing(1),
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  widgetRoot: {
    boxShadow: theme.customShadows.widget,
  },
  widgetBody: {
    paddingBottom: theme.spacing(3),
    paddingRight: theme.spacing(3),
    paddingLeft: theme.spacing(3),
  },
  noPadding: {
    padding: 0,
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    overflow: "hidden",
    cursor: "pointer",
    transition: theme.transitions.create("all", {
      duration: "0.2s",
    }),
    "&:hover": {
      boxShadow: "5px 5px 16px -1px rgba(130,130,130,1)",
    },
  },
  moreButton: {
    margin: -theme.spacing(1),
    padding: 0,
    width: 40,
    height: 40,
    color: theme.palette.text.hint,
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      color: "rgba(255, 255, 255, 0.35)",
    },
  },
}));
