//Models
const Laboratorio = require("../models/laboratorio");
//Constants
const dashboardConstants = require("../constants/dashboardConstants");

exports.getAllLaboratorios = () => {
  return new Promise((resolve, reject) => {
    new Laboratorio()
      .fetchAll({ withRelated: ["tipo"] })
      .then(laboratorios => {
        resolve(laboratorios);
      })
      .catch(err => {
        reject(dashboardConstants().labsError);
      });
  });
};
