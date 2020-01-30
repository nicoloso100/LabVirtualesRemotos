//export const baseURL = "http://54.237.245.2:5000";
export const baseURL = "http://192.168.0.34:5000";
//export const baseURL = "http://192.168.0.19:5000";
//export const baseURL = "http://localhost:5000";

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
};
export const cursosURLs = {
  getCursos: `${APIbaseURL}obtenerCursos`,
  saveCurso: `${APIbaseURL}crearCurso`,
  deleteCurso: `${APIbaseURL}eliminarCurso`,
};
