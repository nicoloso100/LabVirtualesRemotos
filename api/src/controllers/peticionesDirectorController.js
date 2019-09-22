//Constants
const generalConstants = require("../constants/generalConstants");
//Services
const peticionDirectorServices = require("../applicationServices/peticionDirectorServices");

exports.get_peticiones = (req, res) => {
  peticionDirectorServices
    .getPeticiones()
    .then(result => {
      return res.send(result);
    })
    .catch(err => {
      return res.status(500).send(err);
    });
};

exports.reject_peticiones = (req, res) => {
  if (!req.body.email || !req.body.mensaje) {
    return res.status(500).send(generalConstants().missingFields);
  }
  peticionDirectorServices
    .rejectPeticiones(req.body.email, req.body.mensaje)
    .then(result => {
      return res.send(result);
    })
    .catch(err => {
      return res.status(500).send(err);
    });
};

exports.accept_peticiones = (req, res) => {
  if (!req.body.email || !req.body.institucion) {
    return res.status(500).send(generalConstants().missingFields);
  }
  peticionDirectorServices
    .acceptPeticiones(req.body.email, req.body.institucion)
    .then(result => {
      return res.send(result);
    })
    .catch(err => {
      return res.status(500).send(err);
    });
};
