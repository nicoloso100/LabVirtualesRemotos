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
const directoresController = require("./controllers/directoresController");
const profesoresController = require("./controllers/profesoresController");
const cursosController = require("./controllers/cursosController");

//General
router.post("/obtenerUsuarios", initialDataController.get_users);
router.post("/obtenerInstituciones", institucionesController.get_instituciones);
//Mailer
router.post("/sendMail", emailController.send_email);
//Authentication
router.get("/getUser", passport.authenticate("jwt", { session: false }), authController.get_user);
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
router.post("/consultarPeticiones", peticionesDirectorController.get_peticiones);
router.post("/rechazaPeticiones", peticionesDirectorController.reject_peticiones);
router.post("/aceptarPeticiones", peticionesDirectorController.accept_peticiones);
router.post("/agregarInstitucion", institucionesController.add_instituciones);
//Directores
router.post("/obtenerDirectores", directoresController.get_directores);
//Profesores
router.post("/agregarProfesores", profesoresController.add_profesores);
router.post("/obtenerProfesores", profesoresController.get_profesores);
//Cursos
router.post("/obtenerCursos", cursosController.get_cursos);
router.post("/obtenerCursosConAlumnos", cursosController.get_cursosAlumnos);
router.post("/obtenerCursosConLaboratorios", cursosController.get_cursosLaboratorios);
router.post("/crearCurso", cursosController.add_curso);
router.post("/modificarCurso", cursosController.edit_curso);
router.post("/eliminarCurso", cursosController.delete_curso);
router.post("/agregarEstudianteACurso", cursosController.add_estudiante);
router.post("/eliminarEstudianteACurso", cursosController.delete_estudiante);
router.post("/actualizarLaboratorios", cursosController.add_laboratorios);

module.exports = router;
