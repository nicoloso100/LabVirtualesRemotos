const ProfesorConstants = (param1, param2) => {
  return {
    userNotFound: `El usuario ${param1} no existe!`,
    alreadyAlumno: `El usuario ${param1} ya es estudiante`,
    notSupportedRol: `El usuario ${param1} pertenece al rol '${param2}', por lo tanto no puede convertirse en estudiante (Se necesita tener rol Visitante)`,
    addOK: `El usuario ${param1} ha sido exitosamente registrado como Estudiante`,
    addError:
      "No se ha podido registrar el estudiante, por favor contáctese con un administrador",
    getProfesorError: "No se ha podido obtener la información del estudiante"
  };
};

module.exports = ProfesorConstants;
