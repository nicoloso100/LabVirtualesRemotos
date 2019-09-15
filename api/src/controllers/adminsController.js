//Constants
const generalConstants = require("../constants/generalConstants");
//Services
const administradorService = require("../applicationServices/administradorServices");

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
  if (!req.body.email) {
    return res.status(500).send(generalConstants().missingFields);
  }
  administradorService
    .addAdmin(req.body.email)
    .then(result => {
      return res.send(result);
    })
    .catch(err => {
      return res.status(500).send(err);
    });
};

exports.rollback_admin = (req, res) => {
  if (!req.body.email) {
    return res.status(500).send(generalConstants().missingFields);
  }

  administradorService
    .rollbackAdmin(req.body.email)
    .then(result => {
      return res.send(result);
    })
    .catch(err => {
      return res.status(500).send(err);
    });
};
