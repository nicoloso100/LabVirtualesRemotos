const Administrador = require("../models/administrador");
const Usuario = require("../models/usuario");

const adminsConstants = require("../constants/adminsConstants");

exports.get_admins = (req, res) => {
  new Administrador()
    .fetchAll({
      withRelated: [
        {
          usuario: function(qb) {
            qb.select("email", "name", "surname");
          }
        }
      ]
    })
    .then(admins => {
      res.send(admins.toJSON());
    })
    .catch(err => {
      console.log(err);
    });
};

exports.add_admin = (req, res) => {
  const { email } = req.body;
  new Usuario()
    .where("email", email)
    .fetch({ withRelated: ["rol"] })
    .then(result => {
      if (result === null) {
        return res.status(500).send(adminsConstants(email).userNotFound);
      }
      let usuario = result.toJSON();
      if (usuario.rol.id === 5) {
        return res.status(500).send(adminsConstants(email).alreadyAdmin);
      } else if (usuario.rol.id !== 1) {
        return res
          .status(500)
          .send(
            adminsConstants(email, usuario.rol.descripcion).notSupportedRol
          );
      }

      return res.send(usuario);
    })
    .catch(err => {
      return res.status(500).send(adminsConstants().systemError);
    });
};
