//Models
const PeticionDirector = require("../models/peticionesDirector");
const Director = require("../models/director");
//Constants
const peticionesDirectorConstants = require("../constants/peticionesDirectorConstants");
//Services
const emailServices = require("../applicationServices/emailServices");
const usuarioServices = require("../applicationServices/usuarioServices");

exports.getPeticiones = () => {
  return new Promise((resolve, reject) => {
    PeticionDirector.fetchAll({
      withRelated: [
        {
          visitante: function(qb) {
            qb.select("email");
          },
          "visitante.usuario": function(qb) {
            qb.select("email", "name", "surname");
          }
        }
      ]
    })
      .then(model => {
        resolve(model.toJSON());
      })
      .catch(err => {
        reject(peticionesDirectorConstants().getAllError);
      });
  });
};

exports.rejectPeticiones = (email, mensaje) => {
  return new Promise((resolve, reject) => {
    usuarioServices
      .getUsuario(email)
      .then(response => {
        this.deletePeticionDirector(email)
          .then(() => {
            emailServices
              .sendMail(
                email,
                peticionesDirectorConstants().subjectMail,
                response.name,
                mensaje
              )
              .then(() => {
                resolve(peticionesDirectorConstants(email).rejectPetitionOk);
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
  });
};

exports.acceptPeticiones = (email, institucion) => {
  return new Promise((resolve, reject) => {
    new Usuario()
      .where("email", email)
      .fetch({ withRelated: ["rol"] })
      .then(result => {
        if (result === null) {
          reject(peticionesDirectorConstants(email).userNotFound);
        }
        let usuario = result.toJSON();
        if (usuario.rol.id === 4) {
          reject(peticionesDirectorConstants(email).alreadyDirector);
        } else if (usuario.rol.id !== 1) {
          reject(
            peticionesDirectorConstants(email, usuario.rol.descripcion)
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
                  .changeUsuarioRol(email, 4)
                  .then(() => {
                    const director = new Director({
                      email: email,
                      institucion: institucion
                    });
                    director
                      .save(null, { method: "insert" })
                      .then(() => {
                        resolve(
                          peticionesDirectorConstants(email).addDirectorOk
                        );
                      })
                      .catch(err => {
                        reject(
                          peticionesDirectorConstants().directorErrorCreate
                        );
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
        reject(peticionesDirectorConstants().getDirectorError);
      });
  });
};

exports.addPeticionesDirector = params => {
  return new Promise((resolve, reject) => {
    PeticionDirector.where("email", params.email)
      .fetch()
      .then(peticion => {
        if (peticion === null) {
          const peticionDirector = new PeticionDirector({
            email: params.email,
            institucion: params.institucion,
            mensaje: params.mensaje
          });
          peticionDirector
            .save(null, { method: "insert" })
            .then(() => {
              resolve(peticionesDirectorConstants().OK);
            })
            .catch(err => {
              reject(peticionesDirectorConstants().error);
            });
        } else {
          reject(peticionesDirectorConstants().alreadyExists);
        }
      })
      .catch(err => {
        reject(peticionesDirectorConstants().searchError);
      });
  });
};

exports.deletePeticionDirector = email => {
  return new Promise((resolve, reject) => {
    PeticionDirector.where("email", email)
      .fetch()
      .then(peticion => {
        if (peticion !== null) {
          peticion
            .destroy()
            .then(() => {
              resolve(peticionesDirectorConstants().deleteOk);
            })
            .catch(err => {
              reject(peticionesDirectorConstants().deleteError);
            });
        } else {
          resolve(peticionesDirectorConstants().noPeticiones);
        }
      })
      .catch(err => {
        reject(peticionesDirectorConstants().searchError);
      });
  });
};
