const knex = require("../utils/database/databaseConfig");

const User = require("../models/usuario");
const dashboardConstants = require("../constants/dashboardConstants");

exports.get_laboratorios = (req, res) => {
  new User()
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
    knex("visitantes")
      .leftOuterJoin("laboratorios", function() {
        this.on("visitantes.laboratorio", "laboratorios.id");
      })
      .leftOuterJoin("tiposLaboratorio", function() {
        this.on("laboratorios.tipo", "tiposLaboratorio.id");
      })
      .select("laboratorios.*", "tiposLaboratorio.descripcion AS tipo")
      .where("visitantes.email", "=", email)
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(dashboardConstants().visitanteError);
      });
  });
};
