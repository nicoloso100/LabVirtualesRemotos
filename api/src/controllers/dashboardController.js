//Services
const usuarioService = require("../applicationServices/usuarioService");

exports.get_laboratorios = (req, res) => {
  usuarioService
    .getUsuariosLaboratorios(req.body.email)
    .then(result => {
      return res.send(result);
    })
    .catch(err => {
      return res.status(500).send(err);
    });
};
