//Services
const usuarioService = require("../applicationServices/usuarioService");

exports.get_initialData = (req, res) => {
  usuarioService
    .getUsuario(req.body.email)
    .then(result => {
      return res.send(result);
    })
    .catch(err => {
      return res.status(500).send(err);
    });
};

exports.get_users = (req, res) => {
  usuarioService
    .getUsuariosList()
    .then(result => {
      return res.send(result);
    })
    .catch(err => {
      return res.status(500).send(err);
    });
};
