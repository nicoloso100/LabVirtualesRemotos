const AdminsConstants = (param1, param2) => {
  return {
    addAdminOk: `la cuenta ${param1} se ha convertido en administradora`,
    getAdminError: "No se ha podido obtener la informaciónd el administrador",
    errorAdminList: "No se ha podido obtener la lista de administradores",
    userNotFound: `El usuario ${param1} no existe!`,
    adminNotFound: `El administrador no existe!`,
    alreadyAdmin: `El usuario ${param1} ya es administrador`,
    notSupportedRol: `El usuario ${param1} pertenece al rol '${param2}', por lo tanto no puede convertirse en administrador (Se necesita tener rol Visitante)`,
    adminErrorCreate: "Ha ocurrido un error al crear el administrador",
    rollbackSuccess: `Se le han removido los permisos de administrador a la cuenta ${param1}`
  };
};

module.exports = AdminsConstants;
