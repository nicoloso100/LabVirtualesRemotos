//const baseURL = "http://54.237.245.2:5000/api/";
export const baseURL = "http://192.168.0.34:5000";
const APIbaseURL = `${baseURL}/api/`;

export const loginURLs = {
  getToken: `${APIbaseURL}getToken`,
  addUser: `${APIbaseURL}addUser`,
  recoverPassword: `${APIbaseURL}recoverPassword`,
  sendSignInEmail: `${APIbaseURL}sendMail`,
};

export const initialDataURLs = {
  getInitialData: `${APIbaseURL}initialData`,
};

export const dashboardURLs = {
  getLaboratorios: `${APIbaseURL}obtenerLaboratorios`,
};

export const infoURLs = {
  sendInfo: `${APIbaseURL}enviarInfo`,
};
