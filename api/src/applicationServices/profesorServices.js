//Models
const Profesor = require("../models/profesor");
const Usuario = require("../models/usuario");
//Services
const usuarioServices = require("../applicationServices/usuarioServices");
const visitanteServices = require("../applicationServices/visitanteServices");
//Constants
const profesorConstants = require("../constants/profesorConstants");

/**
 * Servicio para obtener la lista de profesores
 */
exports.getProfesoresList = (email) => {
  return new Promise((resolve, reject) => {
    Profesor.where("director", email)
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
        reject(profesorConstants().errorProfesorList);
      });
  });
};

/**
 * Servicio para obtener información detallada de los profesores
 */
exports.getProfesoresDetallado = () => {
  return new Promise((resolve, reject) => {
    Profesor.fetchAll({
      withRelated: [
        "usuario",
        "director.institucion",
        "director.usuario",
        "curso",
        "curso.alumnos.usuario",
      ],
    })
      .then((admins) => {
        resolve(admins.toJSON());
      })
      .catch((err) => {
        console.log(err);
        reject(profesorConstants().errorProfesorList);
      });
  });
};

/**
 * Servicio para obtener la información detallada de los profesores por un director
 */
exports.getProfesoresDetalladoPorDirector = (email) => {
  return new Promise((resolve, reject) => {
    Profesor.where("director", email)
      .fetchAll({
        withRelated: ["usuario", "curso", "curso.alumnos.usuario"],
      })
      .then((admins) => {
        resolve(admins.toJSON());
      })
      .catch((err) => {
        console.log(err);
        reject(profesorConstants().errorProfesorList);
      });
  });
};

/**
 * Servicio para crear un nuevo profesor
 */
exports.addProfesor = (email, director) => {
  return new Promise((resolve, reject) => {
    new Usuario()
      .where("email", email)
      .fetch({ withRelated: ["rol"] })
      .then((result) => {
        if (result === null) {
          reject(profesorConstants(email).userNotFound);
        }
        let usuario = result.toJSON();
        if (usuario.rol.id === 3) {
          reject(profesorConstants(email).alreadyProfesor);
        } else if (usuario.rol.id !== 1) {
          reject(
            profesorConstants(email, usuario.rol.descripcion).notSupportedRol
          );
        }
        visitanteServices
          .deleteVisitante(email)
          .then(() => {
            usuarioServices
              .changeUsuarioRol(email, 3)
              .then(() => {
                const profesor = new Profesor({
                  email: email,
                  director: director,
                });
                profesor
                  .save(null, { method: "insert" })
                  .then(() => {
                    resolve(profesorConstants(email).addOK);
                  })
                  .catch((err) => {
                    reject(profesorConstants().addError);
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
        reject(profesorConstants().getProfesorError);
      });
  });
};
