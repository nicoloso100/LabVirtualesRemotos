const DirectorConstants = (param1, param2) => {
  return {
    userNotFound: `El usuario ${param1} no existe!`,
    alreadyDirector: `El usuario ${param1} ya es director`,
    notSupportedRol: `El usuario ${param1} pertenece al rol '${param2}', por lo tanto no puede convertirse en director (Se necesita tener rol Visitante)`,
    addDirectorOk: `la cuenta ${param1} se ha convertido en director`,
    directorErrorCreate: "Ha ocurrido un error al crear el director",
    getDirectorError: "No se ha podido obtener la informaciónd el administrador"
  };
};

module.exports = DirectorConstants;
