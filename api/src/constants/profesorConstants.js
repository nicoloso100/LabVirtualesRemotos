const ProfesorConstants = (param1, param2) => {
  return {
    userNotFound: `El usuario ${param1} no existe!`,
    errorProfesorList: "No se ha podido obtener la lista de profesores",
    notSupportedRol: `El usuario ${param1} pertenece al rol '${param2}', por lo tanto no puede convertirse en profesor (Se necesita tener rol Visitante)`,
    alreadyProfesor: `El usuario ${param1} ya es profesor`,
    getProfesorError: "No se ha podido obtener la información del profesor",
    addError:
      "No se ha podido registrar el profesor, por favor contáctese con un administrador",
    addOK: `El usuario ${param1} ha sido exitosamente registrado como Profesor`
  };
};

module.exports = ProfesorConstants;
