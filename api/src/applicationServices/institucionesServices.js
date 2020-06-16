//Models
const Institucion = require("../models/institucion");
//Constants
const institucionesConstants = require("../constants/institucionesConstants");

/**
 * Servicio para obtener la lista de instituciones inscritas
 */
exports.getInstituciones = () => {
  return new Promise((resolve, reject) => {
    Institucion.fetchAll()
      .then((instituciones) => {
        resolve(instituciones.toJSON());
      })
      .catch((err) => {
        reject(institucionesConstants().getInstitucionesError);
      });
  });
};

/**
 * Servicio para inscribir una nueva institución
 */
exports.addInstitucion = (nombre) => {
  return new Promise((resolve, reject) => {
    Institucion.where("nombre", nombre)
      .fetch()
      .then((institucion) => {
        if (institucion === null) {
          const institucion = new Institucion({
            nombre: nombre,
          });
          institucion
            .save(null, { method: "insert" })
            .then(() => {
              resolve(institucionesConstants(nombre).successAddInstitucion);
            })
            .catch((err) => {
              reject(institucionesConstants().errorAddInstitucion);
            });
        } else {
          reject(institucionesConstants(nombre).addInstitucionExists);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
};
