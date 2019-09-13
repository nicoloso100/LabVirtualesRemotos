//Models
const Administrador = require("../models/administrador");
//Constants
const adminsConstants = require("../constants/adminsConstants");

exports.getAdminsList = () => {
  return new Promise((resolve, reject) => {
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
        resolve(admins.toJSON());
      })
      .catch(err => {
        reject(adminsConstants().errorAdminList);
      });
  });
};

exports.addAdmin = email => {
  return new Promise((resolve, reject) => {
    new Usuario()
      .where("email", email)
      .fetch({ withRelated: ["rol"] })
      .then(result => {
        if (result === null) {
          reject(adminsConstants(email).userNotFound);
        }
        let usuario = result.toJSON();
        if (usuario.rol.id === 5) {
          reject(adminsConstants(email).alreadyAdmin);
        } else if (usuario.rol.id !== 1) {
          reject(
            adminsConstants(email, usuario.rol.descripcion).notSupportedRol
          );
        }
        resolve(usuario);
      })
      .catch(err => {
        reject(adminsConstants().systemError);
      });
  });
};
