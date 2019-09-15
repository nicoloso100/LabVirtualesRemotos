import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
  inputContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: "15px",
    marginBottom: "15px",
  },
  button: {
    width: "100%",
    maxWidth: "300px",
    marginLeft: "15px",
  },
  loading: {
    marginLeft: "15px",
  },
}));
