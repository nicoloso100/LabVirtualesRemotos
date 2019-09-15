import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
  wrapText: {
    wordBreak: "break-word",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    outline: "none",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  textField: {
    width: "100%",
  },
  button: {
    float: "right",
    marginTop: "5px",
  },
}));
