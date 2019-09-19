//Constants
const generalConstants = require("../constants/generalConstants");
//Services
const institucionesServices = require("../applicationServices/institucionesServices");

exports.get_instituciones = (req, res) => {
  institucionesServices
    .getInstituciones()
    .then(result => {
      return res.send(result);
    })
    .catch(err => {
      return res.status(500).send(err);
    });
};

exports.add_instituciones = (req, res) => {
  if (!req.body.nombre) {
    return res.status(500).send(generalConstants().missingFields);
  }

  institucionesServices
    .addInstitucion(req.body.nombre)
    .then(result => {
      return res.send(result);
    })
    .catch(err => {
      return res.status(500).send(err);
    });
};
