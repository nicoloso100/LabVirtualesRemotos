//Constants
const generalConstants = require("../constants/generalConstants");
//Services
const usuarioService = require("../applicationServices/usuarioServices");

exports.get_laboratorios = (req, res) => {
  if (!req.body.email) {
    return res.status(500).send(generalConstants().missingFields);
  }

  usuarioService
    .getUsuariosLaboratorios(req.body.email)
    .then(result => {
      return res.send(result);
    })
    .catch(err => {
      return res.status(500).send(err);
    });
};
