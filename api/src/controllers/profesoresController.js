//Constants
const generalConstants = require("../constants/generalConstants");
//Services
const profesorServices = require("../applicationServices/profesorServices");

exports.add_profesores = (req, res) => {
  if (!req.body.email || !req.body.director) {
    return res.status(500).send(generalConstants().missingFields);
  }

  profesorServices
    .addProfesor(req.body.email, req.body.director)
    .then(result => {
      return res.send(result);
    })
    .catch(err => {
      return res.status(500).send(err);
    });
};

exports.get_profesores = (req, res) => {
  if (!req.body.email) {
    return res.status(500).send(generalConstants().missingFields);
  }

  profesorServices
    .getProfesoresList(req.body.email)
    .then(result => {
      return res.send(result);
    })
    .catch(err => {
      return res.status(500).send(err);
    });
};
