import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
  appBar: {
    position: "relative",
  },
  formControl: {
    width: "100%",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  InputContainer: {
    display: "flex",
    alignItems: "flex-end",
    marginBottom: "20px",
  },
  InputIcon: {
    fontSize: "2em",
    marginRight: "20px",
  },
  Input: {
    width: "100%",
  },
  StepperContainer: {
    marginTop: "10px",
    marginBottom: "50px",
  },
  ImageUploader: {
    width: "300px",
  },
  StepTitle: {
    textAlign: "center",
    fontSize: 25,
    marginBottom: 30,
  },
  InfoBasicaContainer: {
    display: "flex",
    flexWrap: "wrap",
    [theme.breakpoints.only("xs")]: {
      flexDirection: "column-reverse",
    },
  },
  InfoImage: {
    width: "100%",
    maxWidth: 300,
    padding: "20px",
    [theme.breakpoints.only("xs")]: {
      width: 200,
    },
  },
  InfoContenedorForm: {
    flex: 1,
    padding: 50,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    [theme.breakpoints.only("xs")]: {
      padding: 10,
    },
  },
  InfoContenedorImagen: {
    flex: 1,
    padding: 50,
    alignSelf: "center",
    textAlign: "center",
    [theme.breakpoints.only("xs")]: {
      padding: 10,
    },
  },
}));
