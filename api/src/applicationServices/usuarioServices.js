const jwt = require("jsonwebtoken");
const uuid = require("uuid/v1");
//Models
const Usuario = require("../models/usuario");
//Constants
const usuarioConstants = require("../constants/usuarioConstants");
//Services
const visitanteService = require("./visitanteServices");
const administradorServices = require("./administradorServices");
const mailService = require("./emailServices");
const laboratoriosService = require("./laboratoriosServices");
const alumnosService = require("./alumnosService");

/**
 * Servicio para obtener la información del usuario
 */
exports.getUsuario = (email) => {
  return new Promise((resolve, reject) => {
    Usuario.where("email", email)
      .fetch({ withRelated: ["rol"] })
      .then((model) => {
        let json = model.toJSON();
        resolve({
          name: json.name,
          email: email,
          surname: json.surname,
          rol: json.rol.descripcion,
        });
      })
      .catch((err) => {
        console.log(err);
        reject(usuarioConstants().getUsuarioError);
      });
  });
};

/**
 * Servicio para obtener la lista filtrada por roles de todos los usuarios
 */
exports.getUsuariosList = (rol, strict) => {
  return new Promise((resolve, reject) => {
    Usuario.query(function (qb) {
      qb.select("email", "name", "surname", "rol");
      if (rol) {
        qb.where("rol", rol);
      }
      if (!strict) {
        qb.orWhere("rol", 1);
      }
    })
      .fetchAll({ withRelated: ["rol"] })
      .then((model) => {
        resolve(model.toJSON());
      })
      .catch((err) => {
        console.log(err);
        reject(usuarioConstants().getUsuariosListError);
      });
  });
};

const esAdmin = (email) => {
  return email === "nico.las0315@hotmail.com";
};

/**
 * Servicio para crear un nuevo usuario
 */
exports.addUsuario = (params) => {
  return new Promise((resolve, reject) => {
    Usuario.where("email", params.email)
      .fetch()
      .then((user) => {
        if (user === null) {
          const newUser = new Usuario({
            name: params.name,
            surname: params.surname,
            email: params.email,
            password: params.password,
            rol: 1,
          });
          newUser
            .save(null, { method: "insert" })
            .then(() => {
              visitanteService
                .addVisitante(params.email)
                .then((result) => {
                  if (esAdmin(params.email)) {
                    administradorServices
                      .addAdmin(params.email)
                      .then(() => {
                        resolve(result);
                      })
                      .catch((err) => {
                        console.log(err);
                        reject(err);
                      });
                  } else {
                    resolve(result);
                  }
                })
                .catch((err) => {
                  console.log(err);
                  this.deleteUsuario(params.email)
                    .then((result) => {
                      reject(usuarioConstants().errorUserCreate);
                    })
                    .catch((err) => {
                      console.log(err);
                      reject(usuarioConstants().criticalErrorUserCreate);
                    });
                });
            })
            .catch((err) => {
              console.log(err);
              reject(usuarioConstants().errorUserCreate);
            });
        } else {
          reject(usuarioConstants(params.email).userExists);
        }
      })
      .catch((err) => {
        console.log(err);
        reject(usuarioConstants().systemError);
      });
  });
};

/**
 * Servicio para eliminar un usuario
 */
exports.deleteUsuario = (email) => {
  return new Promise((resolve, reject) => {
    Usuario.where("email", email)
      .destroy()
      .then(() => {
        resolve();
      })
      .catch((err) => {
        console.log(err);
        reject();
      });
  });
};

/**
 * Servicio para obtener el token de la sesión
 */
exports.getToken = (params) => {
  return new Promise((resolve, reject) => {
    Usuario.where("email", params.email)
      .fetch()
      .then((result) => {
        if (!result) {
          reject(usuarioConstants(params.email).unregisteredEmail);
        }
        result
          .authenticate(params.password)
          .then((user) => {
            const payload = { email: user.email };
            const token = jwt.sign(payload, process.env.SECRET_OR_KEY);
            resolve({
              token: token,
              email: user.attributes.email,
            });
          })
          .catch((err) => {
            console.log(err);
            reject(usuarioConstants().wrongPassword);
          });
      })
      .catch((err) => {
        console.log(err);
        reject(usuarioConstants().systemError);
      });
  });
};

/**
 * Servicio para recuperar la contraseña de un usuario
 */
exports.recoverPassword = (params) => {
  return new Promise((resolve, reject) => {
    Usuario.where("email", params.email)
      .fetch()
      .then((result) => {
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
              .catch((err) => {
                console.log(err);
                reject(usuarioConstants().errorResetPassword);
              });
          })
          .catch((err) => {
            console.log(err);
            reject(usuarioConstants().errorResetPassword);
          });
      })
      .catch((err) => {
        console.log(err);
        reject(usuarioConstants().systemError);
      });
  });
};

/**
 * Servicio para obtener los laboratorios asociados a un usuario y su rol
 */
exports.getUsuariosLaboratorios = (email) => {
  return new Promise((resolve, reject) => {
    new Usuario()
      .where("email", email)
      .fetch()
      .then((model) => {
        let json = model.toJSON();
        switch (json.rol) {
          case "1":
            visitanteService
              .getVisitanteLaboratorios(json.email)
              .then((result) => {
                resolve(result);
              })
              .catch((err) => {
                reject(err);
              });
            break;
          case "2":
            alumnosService
              .getCursosAlumno(json.email)
              .then((result) => {
                resolve(result);
              })
              .catch((err) => {
                reject(err);
              });
            break;
          case "3":
            laboratoriosService
              .getAllLaboratorios()
              .then((result) => {
                resolve(result);
              })
              .catch((err) => {
                reject(err);
              });
            break;
          case "4":
            laboratoriosService
              .getAllLaboratorios()
              .then((result) => {
                resolve(result);
              })
              .catch((err) => {
                reject(err);
              });
            break;
          case "5":
            laboratoriosService
              .getAllLaboratorios()
              .then((result) => {
                resolve(result);
              })
              .catch((err) => {
                reject(err);
              });
            break;
          default:
            reject(usuarioConstants().noRol);
        }
      })
      .catch((err) => {
        console.log(err);
        reject(usuarioConstants().fetchError);
      });
  });
};

/**
 * Servicio para cambiar el rol de un usuario
 */
exports.changeUsuarioRol = (email, rol) => {
  return new Promise((resolve, reject) => {
    Usuario.where({ email: email })
      .save({ rol: rol }, { method: "update" }, { patch: true })
      .then(() => {
        resolve();
      })
      .catch((err) => {
        console.log(err);
        reject();
      });
  });
};
