const jwt = require("jsonwebtoken");
const uuid = require("uuid/v1");
//Models
const Usuario = require("../models/usuario");
//Constants
const usuarioConstants = require("../constants/usuarioConstants");
//Services
const visitanteService = require("./visitanteServices");
const mailService = require("./emailServices");
const laboratoriosService = require("./laboratoriosServices");

exports.getUsuario = email => {
  return new Promise((resolve, reject) => {
    Usuario.where("email", email)
      .fetch({ withRelated: ["rol"] })
      .then(model => {
        let json = model.toJSON();
        resolve({
          name: json.name,
          email: email,
          surname: json.surname,
          rol: json.rol.descripcion
        });
      })
      .catch(err => {
        reject(usuarioConstants().getUsuarioError);
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
        reject(usuarioConstants().getUsuariosListError);
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
                      reject(usuarioConstants().errorUserCreate);
                    })
                    .catch(err => {
                      reject(usuarioConstants().criticalErrorUserCreate);
                    });
                });
            })
            .catch(err => {
              console.log(err);
              reject(usuarioConstants().errorUserCreate);
            });
        } else {
          reject(usuarioConstants(params.email).userExists);
        }
      })
      .catch(err => {
        reject(usuarioConstants().systemError);
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
          reject(usuarioConstants(params.email).unregisteredEmail);
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
            reject(usuarioConstants().wrongPassword);
          });
      })
      .catch(err => {
        reject(usuarioConstants().systemError);
      });
  });
};

exports.recoverPassword = params => {
  return new Promise((resolve, reject) => {
    Usuario.where("email", params.email)
      .fetch()
      .then(result => {
        if (!result) {
          reject(usuarioConstants(params.email).unregisteredEmail);
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
                usuarioConstants().resetPasswordSubject,
                result.toJSON().name,
                usuarioConstants(newPassword).resetPasswordBody
              )
              .then(() => {
                resolve(usuarioConstants().resetPassword);
              })
              .catch(err => {
                reject(usuarioConstants().errorResetPassword);
              });
          })
          .catch(err => {
            reject(usuarioConstants().errorResetPassword);
          });
      })
      .catch(err => {
        reject(usuarioConstants().systemError);
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
          case "3":
            laboratoriosService
              .getAllLaboratorios()
              .then(result => {
                resolve(result);
              })
              .catch(err => {
                reject(err);
              });
            break;
          case "4":
            laboratoriosService
              .getAllLaboratorios()
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
            reject(usuarioConstants().noRol);
        }
      })
      .catch(err => {
        reject(usuarioConstants().fetchError);
      });
  });
};

exports.changeUsuarioRol = (email, rol) => {
  return new Promise((resolve, reject) => {
    Usuario.where({ email: email })
      .save({ rol: rol }, { method: "update" }, { patch: true })
      .then(() => {
        resolve();
      })
      .catch(err => {
        reject();
      });
  });
};
