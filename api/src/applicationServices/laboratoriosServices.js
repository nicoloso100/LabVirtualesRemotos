//Models
const Laboratorio = require("../models/laboratorio");
//Constants
const laboratoriosConstants = require("../constants/laboratoriosConstants");

/**
 * Servicio para obtener toda la lista de laboratorios
 */
exports.getAllLaboratorios = () => {
  return new Promise((resolve, reject) => {
    new Laboratorio()
      .fetchAll({ withRelated: ["tipo"] })
      .then((laboratorios) => {
        resolve(laboratorios);
      })
      .catch((err) => {
        reject(laboratoriosConstants().labsError);
      });
  });
};
