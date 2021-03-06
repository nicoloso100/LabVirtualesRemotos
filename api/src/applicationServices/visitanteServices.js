//Models
const Visitante = require("../models/visitante");
//Constants
const visitanteConstants = require("../constants/visitanteConstants");

/**
 * Servicio para crear un visitante
 */
exports.addVisitante = (email) => {
  return new Promise((resolve, reject) => {
    Visitante.where("email", email)
      .fetch()
      .then((visitante) => {
        if (visitante === null) {
          const visitante = new Visitante({
            email: email,
            laboratorio: 1,
          });
          visitante
            .save(null, { method: "insert" })
            .then(() => {
              resolve(visitanteConstants().userCreated);
            })
            .catch((err) => {
              reject(visitanteConstants().errorUserCreate);
            });
        } else {
          reject(visitanteConstants(email).userExists);
        }
      });
  });
};

/**
 * Servicio para obtener los laboratorios del visitante
 */
exports.getVisitanteLaboratorios = (email) => {
  return new Promise((resolve, reject) => {
    Visitante.where("email", email)
      .fetch({ withRelated: ["laboratorio", "laboratorio.tipo"] })
      .then((labVisitante) => {
        resolve([labVisitante.toJSON().laboratorio]);
      })
      .catch((err) => {
        reject(visitanteConstants().getlabsError);
      });
  });
};

/**
 * Servicio para eliminar un visitante
 */
exports.deleteVisitante = (email) => {
  return new Promise((resolve, reject) => {
    Visitante.where("email", email)
      .destroy()
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(visitanteConstants().visitanteNotFound);
      });
  });
};
