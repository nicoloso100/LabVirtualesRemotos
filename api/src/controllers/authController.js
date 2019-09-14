//Constants
const generalConstants = require("../constants/generalConstants");
//Services
const usuarioService = require("../applicationServices/usuarioServices");

exports.get_user = (req, res) => {
  return res.send(req.user);
};

exports.add_user = (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(500).send(generalConstants().missingFields);
  }
  usuarioService
    .addUsuario(req.body)
    .then(result => {
      return res.send(result);
    })
    .catch(err => {
      return res.status(500).send(err);
    });
};

exports.get_token = (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(500).send(generalConstants().missingFields);
  }
  usuarioService
    .getToken(req.body)
    .then(result => {
      return res.send(result);
    })
    .catch(err => {
      return res.status(500).send(err);
    });
};

exports.recover_password = (req, res) => {
  if (!req.body.email) {
    return res.status(500).send(generalConstants().missingFields);
  }
  usuarioService
    .recoverPassword(req.body)
    .then(result => {
      return res.send(result);
    })
    .catch(err => {
      return res.status(500).send(err);
    });
};
