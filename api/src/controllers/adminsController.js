//Services
const administradorService = require("../applicationServices/administradorService");

exports.get_admins = (req, res) => {
  administradorService
    .getAdminsList()
    .then(result => {
      return res.send(result);
    })
    .catch(err => {
      return res.status(500).send(err);
    });
};

exports.add_admin = (req, res) => {
  administradorService
    .addAdmin(req.body.email)
    .then(result => {
      return res.send(result);
    })
    .catch(err => {
      return res.status(500).send(err);
    });
};
