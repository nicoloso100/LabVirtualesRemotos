const AdminsConstants = (param1, param2) => {
  return {
    userNotFound: `El usuario ${param1} no existe!`,
    systemError:
      "La petición no pudo ser llevada a cabo debido a un fallo en el sistema, por favor inténtalo más tarde",
    notSupportedRol: `El usuario ${param1} pertenece al rol '${param2}', por lo tanto no puede convertirse en administrador (Se necesita tener rol Visitante)`,
    alreadyAdmin: `El usuario ${param1} ya es administrador`,
    errorAdminList: "No se ha podido obtener la lista de administradores"
  };
};

module.exports = AdminsConstants;
