import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
  wrapText: {
    wordBreak: "break-word",
  },
  ListField: {
    width: "100%",
  },
  button: {
    float: "right",
    marginTop: "5px",
  },
  correosList: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "space-between",
  },
  table: {
    minWidth: 650,
  },
}));
