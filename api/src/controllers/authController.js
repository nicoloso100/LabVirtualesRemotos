//Constants
const authConstants = require("../constants/authenticationConstants");
//Services
const usuarioService = require("../applicationServices/usuarioService");

exports.get_user = (req, res) => {
  return res.send(req.user);
};

exports.add_user = (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(500).send(authConstants().missingFields);
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
    return res.status(500).send(authConstants().missingFields);
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
    return res.status(500).send(authConstants().missingFields);
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
