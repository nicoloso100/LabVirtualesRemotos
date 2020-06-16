//Models
const Administrador = require("../models/administrador");
const Usuario = require("../models/usuario");
//Constants
const administradorConstants = require("../constants/administradorConstants");
//Services
const visitanteService = require("./visitanteServices");
const usuarioServices = require("./usuarioServices");
const peticionDirectorServices = require("./peticionDirectorServices");

/**
 * Servicio para obtener la lista de administradores
 */
exports.getAdminsList = () => {
  return new Promise((resolve, reject) => {
    new Administrador()
      .fetchAll({
        withRelated: [
          {
            usuario: function (qb) {
              qb.select("email", "name", "surname");
            },
          },
        ],
      })
      .then((admins) => {
        resolve(admins.toJSON());
      })
      .catch((err) => {
        reject(administradorConstants().errorAdminList);
      });
  });
};

/**
 * Servicio para crear un administrador
 */
exports.addAdmin = (email) => {
  return new Promise((resolve, reject) => {
    new Usuario()
      .where("email", email)
      .fetch({ withRelated: ["rol"] })
      .then((result) => {
        if (result === null) {
          reject(administradorConstants(email).userNotFound);
        }
        let usuario = result.toJSON();
        if (usuario.rol.id === 5) {
          reject(administradorConstants(email).alreadyAdmin);
        } else if (usuario.rol.id !== 1) {
          reject(
            administradorConstants(email, usuario.rol.descripcion)
              .notSupportedRol
          );
        }
        peticionDirectorServices
          .deletePeticionDirector(email)
          .then(() => {
            visitanteService
              .deleteVisitante(email)
              .then(() => {
                usuarioServices
                  .changeUsuarioRol(email, 5)
                  .then(() => {
                    const administrador = new Administrador({
                      email: email,
                    });
                    administrador
                      .save(null, { method: "insert" })
                      .then(() => {
                        resolve(administradorConstants(email).addAdminOk);
                      })
                      .catch((err) => {
                        reject(administradorConstants().adminErrorCreate);
                      });
                  })
                  .catch((err) => {
                    reject(err);
                  });
              })
              .catch((err) => {
                reject(err);
              });
          })
          .catch((err) => {
            reject(err);
          });
      })
      .catch((err) => {
        reject(administradorConstants().getAdminError);
      });
  });
};

/**
 * Servicio para quitar el rol de admin
 */
exports.rollbackAdmin = (email) => {
  return new Promise((resolve, reject) => {
    this.deleteAdmin(email)
      .then(() => {
        visitanteService
          .addVisitante(email)
          .then(() => {
            usuarioServices
              .changeUsuarioRol(email, 1)
              .then(() => {
                resolve(administradorConstants(email).rollbackSuccess);
              })
              .catch((err) => {
                reject(err);
              });
          })
          .catch((err) => {
            reject(err);
          });
      })
      .catch((err) => {
        reject(err);
      });
  });
};

/**
 * Servicio para borrar una cuenta de admin
 */
exports.deleteAdmin = (email) => {
  return new Promise((resolve, reject) => {
    Administrador.where("email", email)
      .destroy()
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(administradorConstants().adminNotFound);
      });
  });
};
