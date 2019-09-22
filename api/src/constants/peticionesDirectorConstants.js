const PeticionesDirectorConstants = (param1, param2) => {
  return {
    searchError:
      "No se ha podido traer la información de las peticiones, por favor intentalo más tarde",
    OK: "Los datos han sido enviados correctamente",
    error: "No se han podido enviar los datos, por favor inténtelo más tarde",
    alreadyExists:
      "Ya hemos recibido una petición asociada a ésta cuenta, en tu correo te enviaremos nuestra respuesta",
    deleteError:
      "Ha ocurrido un error al borrar la petición a director registrada con esta cuenta",
    deleteOk: "Se ha borrado exitosamente la petición a director",
    noPeticiones: "No se han encontrado peticiones asociadas a esta cuenta",
    getAllError: "No se ha podido obtener la lista de peticiones",
    subjectMail: "Notificación de tu peticion para convertirte en Director",
    textMail: `Lamentablemente hemos rechazado tu petición: ${param1}`,
    rejectPetitionOk: `La petición para promover a director al usuario ${param1} ha sido rechazada`,
    userNotFound: `El usuario ${param1} no existe!`,
    alreadyDirector: `El usuario ${param1} ya es director`,
    notSupportedRol: `El usuario ${param1} pertenece al rol '${param2}', por lo tanto no puede convertirse en administrador (Se necesita tener rol Visitante)`,
    addDirectorOk: `la cuenta ${param1} se ha convertido en director`,
    directorErrorCreate: "Ha ocurrido un error al crear el director",
    getDirectorError: "No se ha podido obtener la informaciónd el administrador"
  };
};

module.exports = PeticionesDirectorConstants;
