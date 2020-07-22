//export const baseURL = "http://192.168.0.34:5000";
//export const baseURL = "http://localhost:25841";
export const baseURL = "http://5.189.175.156:5000";

const APIbaseURL = `${baseURL}/api/`;

export const loginURLs = {
  getToken: `${APIbaseURL}getToken`,
  addUser: `${APIbaseURL}addUser`,
  recoverPassword: `${APIbaseURL}recoverPassword`,
  sendSignInEmail: `${APIbaseURL}sendMail`,
};

export const initialDataURLs = {
  getDatosIniciales: `${APIbaseURL}datosIniciales`,
  getUsuarios: `${APIbaseURL}obtenerUsuarios`,
  getInstituciones: `${APIbaseURL}obtenerInstituciones`,
};

export const dashboardURLs = {
  getLaboratorios: `${APIbaseURL}obtenerLaboratorios`,
};

export const infoURLs = {
  sendInfo: `${APIbaseURL}enviarInfo`,
};

export const adminsURLs = {
  getAdmins: `${APIbaseURL}obtenerAdmins`,
  addAdmin: `${APIbaseURL}crearAdmin`,
  deleteAdmin: `${APIbaseURL}eliminarAdmin`,
};

export const peticionesURLs = {
  getAdmins: `${APIbaseURL}consultarPeticiones`,
  rejectPeticiones: `${APIbaseURL}rechazaPeticiones`,
  acceptPeticiones: `${APIbaseURL}aceptarPeticiones`,
  saveInstitucion: `${APIbaseURL}agregarInstitucion`,
};

export const DirectoresURLs = {
  getDirectores: `${APIbaseURL}obtenerDirectores`,
};

export const profesoresURLs = {
  addProfesor: `${APIbaseURL}agregarProfesores`,
  getProfesores: `${APIbaseURL}obtenerProfesores`,
  getProfesoresDetallado: `${APIbaseURL}obtenerProfesoresDetallado`,
  getProfesoresDetalladoPorDirector: `${APIbaseURL}obtenerProfesoresDetalladoPorDirector`,
};
export const cursosURLs = {
  getCursos: `${APIbaseURL}obtenerCursos`,
  getCursosEstudiantes: `${APIbaseURL}obtenerCursosConAlumnos`,
  getCursosLaboratorios: `${APIbaseURL}obtenerCursosConLaboratorios`,
  saveCurso: `${APIbaseURL}crearCurso`,
  editCurso: `${APIbaseURL}modificarCurso`,
  deleteCurso: `${APIbaseURL}eliminarCurso`,
  addEstudianteACurso: `${APIbaseURL}agregarEstudianteACurso`,
  deleteEstudianteACurso: `${APIbaseURL}eliminarEstudianteACurso`,
  saveLaboratorios: `${APIbaseURL}actualizarLaboratorios`,
};
