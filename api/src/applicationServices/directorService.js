//Models
const Usuario = require("../models/usuario");
const Director = require("../models/director");
//Constants
const directorConstants = require("../constants/directorConstants");
//Services
const peticionDirectorServices = require("../applicationServices/peticionDirectorServices");
const visitanteServices = require("../applicationServices/visitanteServices");
const usuarioServices = require("../applicationServices/usuarioServices");

exports.addDirector = (email, institucion) => {
  return new Promise((resolve, reject) => {
    new Usuario()
      .where("email", email)
      .fetch({ withRelated: ["rol"] })
      .then(result => {
        if (result === null) {
          reject(directorConstants(email).userNotFound);
        }
        let usuario = result.toJSON();
        if (usuario.rol.id === 4) {
          reject(directorConstants(email).alreadyDirector);
        } else if (usuario.rol.id !== 1) {
          reject(
            directorConstants(email, usuario.rol.descripcion).notSupportedRol
          );
        }
        peticionDirectorServices
          .deletePeticionDirector(email)
          .then(() => {
            visitanteServices
              .deleteVisitante(email)
              .then(() => {
                usuarioServices
                  .changeUsuarioRol(email, 4)
                  .then(() => {
                    const director = new Director({
                      email: email,
                      institucion: institucion
                    });
                    director
                      .save(null, { method: "insert" })
                      .then(() => {
                        resolve(directorConstants(email).addDirectorOk);
                      })
                      .catch(err => {
                        reject(directorConstants().directorErrorCreate);
                      });
                  })
                  .catch(err => {
                    reject(err);
                  });
              })
              .catch(err => {
                reject(err);
              });
          })
          .catch(err => {
            reject(err);
          });
      })
      .catch(err => {
        reject(directorConstants().getDirectorError);
      });
  });
};
