const InfoConstants = param => {
  return {
    searchError:
      "No se ha podido traer la información de las peticiones, por favor intentalo más tarde",
    OK: "Los datos han sido enviados correctamente",
    error: "No se han podido enviar los datos, por favor inténtelo más tarde",
    alreadyExists:
      "Ya hemos recibido una petición asociada a ésta cuenta, en tu correo te enviaremos nuestra respuesta"
  };
};

module.exports = InfoConstants;
