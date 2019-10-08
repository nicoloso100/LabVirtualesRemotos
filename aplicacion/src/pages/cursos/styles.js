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
  ImgButtonContainer: {
    display: "flex",
    justifyContent: "space-between",
    width: "70%",
    maxWidth: "1200px",
    margin: "20px auto 20px auto",
  },
  LabsContainer: {
    display: "flex",
  },
  LabsDroppable: {
    width: "100% !important",
    margin: "8px",
    padding: "20px",
    maxHeight: "80vh",
    overflow: "auto",
    [theme.breakpoints.only("xs")]: {
      padding: "5px",
    },
  },
  CardContainer: {
    margin: "20px",
    [theme.breakpoints.only("xs")]: {
      margin: "10px 0 10px 0",
    },
  },
  card: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: "5px",
    width: "100%",
    height: "100px",
    [theme.breakpoints.only("xs")]: {
      flexDirection: "column",
      height: "200px",
    },
  },
  titleCard: {
    flex: 2,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.only("xs")]: {
      flex: 1,
    },
  },
  widgetImage: {
    flex: 1,
    width: "100%",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  },
  EstudiantesContainer: {
    padding: 20,
    width: "70%",
    maxWidth: "1000px",
    margin: "10px auto 50px auto",
  },
}));
