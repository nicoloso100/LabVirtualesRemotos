const jwt = require("jsonwebtoken");
const uuid = require("uuid/v1");
//Models
const Usuario = require("../models/usuario");
//Constants
const authConstants = require("../constants/authenticationConstants");
const dashboardConstants = require("../constants/dashboardConstants");
//Services
const visitanteService = require("../applicationServices/visitanteServices");
const mailService = require("../applicationServices/mailService");
const laboratoriosService = require("../applicationServices/laboratoriosService");

exports.getUsuario = email => {
  return new Promise((resolve, reject) => {
    Usuario.where("email", email)
      .fetch({ withRelated: ["rol"] })
      .then(model => {
        let json = model.toJSON();
        resolve({
          name: json.name,
          surname: json.surname,
          rol: json.rol.descripcion
        });
      })
      .catch(err => {
        reject(initialDataConstats().fetchError);
      });
  });
};

exports.getUsuariosList = () => {
  return new Promise((resolve, reject) => {
    Usuario.query(function(qb) {
      qb.select("email", "name", "surname", "rol");
    })
      .fetchAll({ withRelated: ["rol"] })
      .then(model => {
        resolve(model.toJSON());
      })
      .catch(err => {
        reject(initialDataConstats().fetchError);
      });
  });
};

exports.addUsuario = params => {
  return new Promise((resolve, reject) => {
    Usuario.where("email", params.email)
      .fetch()
      .then(user => {
        if (user === null) {
          const newUser = new Usuario({
            name: params.name,
            surname: params.surname,
            email: params.email,
            password: params.password,
            rol: 1
          });
          newUser
            .save(null, { method: "insert" })
            .then(() => {
              visitanteService
                .addVisitante(params.email)
                .then(result => {
                  resolve(result);
                })
                .catch(err => {
                  this.deleteUsuario(params.email)
                    .then(result => {
                      reject(authConstants().errorUserCreate);
                    })
                    .catch(err => {
                      reject(authConstants().criticalErrorUserCreate);
                    });
                });
            })
            .catch(err => {
              reject(authConstants().errorUserCreate);
            });
        } else {
          reject(authConstants(params.email).userExists);
        }
      })
      .catch(err => {
        reject(authConstants().systemError);
      });
  });
};

exports.deleteUsuario = email => {
  return new Promise((resolve, reject) => {
    Usuario.where("email", email)
      .destroy()
      .then(() => {
        resolve();
      })
      .catch(err => {
        reject();
      });
  });
};

exports.getToken = params => {
  return new Promise((resolve, reject) => {
    Usuario.where("email", params.email)
      .fetch()
      .then(result => {
        if (!result) {
          reject(authConstants(params.email).unregisteredEmail);
        }
        result
          .authenticate(params.password)
          .then(user => {
            const payload = { email: user.email };
            const token = jwt.sign(payload, process.env.SECRET_OR_KEY);
            resolve({
              token: token,
              email: user.attributes.email
            });
          })
          .catch(err => {
            reject(authConstants().wrongPassword);
          });
      })
      .catch(err => {
        reject(authConstants().systemError);
      });
  });
};

exports.recoverPassword = params => {
  return new Promise((resolve, reject) => {
    Usuario.where("email", params.email)
      .fetch()
      .then(result => {
        if (!result) {
          reject(authConstants(params.email).unregisteredEmail);
        }
        const newPassword = uuid().split("-")[0];
        result
          .where({ email: params.email })
          .save(
            { password: newPassword },
            { method: "update" },
            { patch: true }
          )
          .then(() => {
            mailService
              .sendMail(
                params.email,
                authConstants().resetPasswordSubject,
                result.toJSON().name,
                authConstants(newPassword).resetPasswordBody
              )
              .then(() => {
                resolve(authConstants().resetPassword);
              })
              .catch(err => {
                reject(authConstants().errorResetPassword);
              });
          })
          .catch(err => {
            reject(authConstants().errorResetPassword);
          });
      })
      .catch(err => {
        reject(authConstants().systemError);
      });
  });
};

exports.getUsuariosLaboratorios = email => {
  return new Promise((resolve, reject) => {
    new Usuario()
      .where("email", email)
      .fetch()
      .then(model => {
        let json = model.toJSON();
        switch (json.rol) {
          case "1":
            visitanteService
              .getVisitanteLaboratorios(json.email)
              .then(result => {
                resolve(result);
              })
              .catch(err => {
                reject(err);
              });
            break;
          case "5":
            laboratoriosService
              .getAllLaboratorios()
              .then(result => {
                resolve(result);
              })
              .catch(err => {
                reject(err);
              });
            break;
          default:
            reject(dashboardConstants().noRol);
        }
      })
      .catch(err => {
        reject(dashboardConstants().fetchError);
      });
  });
};
