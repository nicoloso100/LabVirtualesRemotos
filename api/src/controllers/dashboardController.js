const knex = require("../utils/database/databaseConfig");

const Usuario = require("../models/usuario");
const Visitante = require("../models/visitante");
const Laboratorio = require("../models/laboratorio");

const dashboardConstants = require("../constants/dashboardConstants");

exports.get_laboratorios = (req, res) => {
  new Usuario()
    .where("email", req.body.email)
    .fetch()
    .then(model => {
      let json = model.toJSON();
      switch (json.rol) {
        case "1":
          getVisitanteLboratorios(json.email)
            .then(result => {
              return res.send(result);
            })
            .catch(err => {
              return res.status(500).send(err);
            });
          break;
        case "5":
          getAllLaboratorios()
            .then(result => {
              return res.send(result);
            })
            .catch(err => {
              return res.status(500).send(err);
            });
          break;
        default:
          return res.status(500).send(dashboardConstants().noRol);
      }
    })
    .catch(err => {
      return res.status(500).send(dashboardConstants().fetchError);
    });
};

getVisitanteLboratorios = email => {
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

getAllLaboratorios = () => {
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
