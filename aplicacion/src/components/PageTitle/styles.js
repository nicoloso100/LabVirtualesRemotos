import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
  pageTitleContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(5),
  },
  typo: {
    alignSelf: "center",
    marginRight: 10,
    color: theme.palette.text.hint,
  },
  button: {
    minWidth: 200,
    boxShadow: theme.customShadows.widget,
    textTransform: "none",
    "&:active": {
      boxShadow: theme.customShadows.widgetWide,
    },
  },
}));
