const InstitucionesConstants = param => {
  return {
    getInstitucionesError: "No se ha podido obtener la lista de instituciones",
    addInstitucionExists: `No se ha podido añadir la institucion "${param}" debido a que ya está registrada`,
    errorAddInstitucion: `Ha ocurrido un error al agregar la institución, por favor inténtelo más tarde`,
    successAddInstitucion: `La institución "${param}" se ha añadido exitosamente`
  };
};

module.exports = InstitucionesConstants;
