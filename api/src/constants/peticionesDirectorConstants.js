const PeticionesDirectorConstants = param => {
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
    noPeticiones: "No se han encontrado peticiones asociadas a esta cuenta"
  };
};

module.exports = PeticionesDirectorConstants;
