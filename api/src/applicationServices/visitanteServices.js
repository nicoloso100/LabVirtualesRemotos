//Models
const Visitante = require("../models/visitante");
//Constants
const authConstants = require("../constants/authenticationConstants");
const dashboardConstants = require("../constants/dashboardConstants");

exports.addVisitante = email => {
  return new Promise((resolve, reject) => {
    Visitante.where("email", email)
      .fetch()
      .then(visitante => {
        if (visitante === null) {
          const visitante = new Visitante({
            email: email,
            laboratorio: 1
          });
          visitante
            .save(null, { method: "insert" })
            .then(() => {
              resolve(authConstants().userCreated);
            })
            .catch(err => {
              reject(authConstants().errorUserCreate);
            });
        } else {
          reject(authConstants(email).userExists);
        }
      });
  });
};

exports.getVisitanteLaboratorios = email => {
  return new Promise((resolve, reject) => {
    new Visitante()
      .where("email", email)
      .fetch({ withRelated: ["laboratorio", "laboratorio.tipo"] })
      .then(labVisitante => {
        resolve([labVisitante.toJSON().laboratorio]);
      })
      .catch(err => {
        reject(dashboardConstants().labsError);
      });
  });
};
