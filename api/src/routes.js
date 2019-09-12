const router = require("express").Router();
const passport = require("./utils/authentication/passport");

//Controllers
const mailerController = require("./controllers/mailerController");
const authController = require("./controllers/authController");
const initialDataController = require("./controllers/initialDataController");
const dashboardController = require("./controllers/dashboardController");
const infoController = require("./controllers/infoController");
const adminsController = require("./controllers/adminsController");

//Mailer
router.post("/sendMail", mailerController.send_email);
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
router.post("/obtenerUsuarios", initialDataController.get_users);
//Dashboard
router.post("/obtenerLaboratorios", dashboardController.get_laboratorios);
//Info
router.post("/enviarInfo", infoController.send_info);
//Admins
router.post("/obtenerAdmins", adminsController.get_admins);
router.post("/crearAdmin", adminsController.add_admin);

module.exports = router;
