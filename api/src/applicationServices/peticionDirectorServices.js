//Models
const PeticionDirector = require("../models/peticionesDirector");
//Constants
const peticionesDirectorConstants = require("../constants/peticionesDirectorConstants");
//Services
const emailServices = require("../applicationServices/emailServices");
const usuarioServices = require("../applicationServices/usuarioServices");
const directorService = require("../applicationServices/directorService");

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
    usuarioServices
      .getUsuario(email)
      .then(response => {
        directorService
          .addDirector(email, institucion)
          .then(() => {
            emailServices
              .sendMail(
                email,
                peticionesDirectorConstants().subjectMail,
                response.name,
                peticionesDirectorConstants().acceptMessage
              )
              .then(() => {
                resolve(peticionesDirectorConstants(email).acceptPetitionOk);
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
