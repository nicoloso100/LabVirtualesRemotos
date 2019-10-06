//Constants
const generalConstants = require("../constants/generalConstants");
//Services
const cursosServices = require("../applicationServices/cursosServices");

exports.get_cursos = (req, res) => {
  if (!req.body.profesor) {
    return res.status(500).send(generalConstants().missingFields);
  }

  cursosServices
    .getCursos(req.body.profesor)
    .then(result => {
      return res.send(result);
    })
    .catch(err => {
      return res.status(500).send(err);
    });
};

exports.add_curso = (req, res) => {
  if (!req.body.profesor) {
    return res.status(500).send(generalConstants().missingFields);
  }

  cursosServices
    .getCursos(req.body.profesor)
    .then(result => {
      return res.send(result);
    })
    .catch(err => {
      return res.status(500).send(err);
    });
};
