const router = require("express").Router();
const passport = require("./utils/authentication/passport");

//Controllers
const emailController = require("./controllers/emailController");
const authController = require("./controllers/authController");
const initialDataController = require("./controllers/initialDataController");
const dashboardController = require("./controllers/dashboardController");
const infoController = require("./controllers/infoController");
const adminsController = require("./controllers/adminsController");
const peticionesDirectorController = require("./controllers/peticionesDirectorController");
const institucionesController = require("./controllers/institucionesController");

//General
router.post("/obtenerUsuarios", initialDataController.get_users);
router.post("/obtenerInstituciones", institucionesController.get_instituciones);
//Mailer
router.post("/sendMail", emailController.send_email);
//Authentication
router.get(
  "/getUser",
  passport.authenticate("jwt", { session: false }),
  authController.get_user
);
router.post("/addUser", authController.add_user);
router.post("/getToken", authController.get_token);
router.post("/recoverPassword", authController.recover_password);
//Initial data
router.post("/datosIniciales", initialDataController.get_initialData);
//Dashboard
router.post("/obtenerLaboratorios", dashboardController.get_laboratorios);
//Info
router.post("/enviarInfo", infoController.send_info);
//Admins
router.post("/obtenerAdmins", adminsController.get_admins);
router.post("/crearAdmin", adminsController.add_admin);
router.post("/eliminarAdmin", adminsController.rollback_admin);
//Peticiones
router.post(
  "/consultarPeticiones",
  peticionesDirectorController.get_peticiones
);
router.post(
  "/rechazaPeticiones",
  peticionesDirectorController.reject_peticiones
);
router.post(
  "/aceptarPeticiones",
  peticionesDirectorController.accept_peticiones
);
router.post("/agregarInstitucion", institucionesController.add_instituciones);

module.exports = router;
