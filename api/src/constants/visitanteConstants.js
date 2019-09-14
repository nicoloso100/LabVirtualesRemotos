const VisitanteConstants = param => {
  return {
    visitanteNotFound:
      "No se ha podido cambiar el rol del visitante, por favor intente más tarde",
    userExists: `El usuario ${param} ya existe!`,
    userCreated: "El usuario se ha creado correctamente!",
    errorUserCreate:
      "Ha ocurrido un error al crear el usuario, inténtalo más tarde",
    getlabsError:
      "Ha ocurrido un error al intentar obtener los laboratorios vinculados al visitante"
  };
};

module.exports = VisitanteConstants;
