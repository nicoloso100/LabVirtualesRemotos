import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
  ListTittle: {
    fontSize: 30,
  },
  ListItem: {
    paddingTop: 30,
    paddingBottom: 30,
    cursor: "pointer",
    transition: theme.transitions.create("all", {
      duration: "0.2s",
    }),
    "&:hover": {
      boxShadow: "5px 5px 16px -1px rgba(130,130,130,1)",
    },
  },
  SlidePanel: {
    paddingTop: 70,
    [theme.breakpoints.only("xs")]: {
      width: "100% !important",
    },
  },
  textMargin: {
    marginTop: 30,
    marginBottom: 10,
  },
  sendButton: {
    width: "150px",
    justifyContent: "space-between",
  },
}));
