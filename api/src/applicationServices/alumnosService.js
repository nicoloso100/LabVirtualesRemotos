//Models
const Alumno = require("../models/alumno");
const Usuario = require("../models/usuario");
//Constants
const alumnoConstants = require("../constants/alumnoConstants");
//Services
const visitanteServices = require("../applicationServices/visitanteServices");
const usuarioServices = require("../applicationServices/usuarioServices");

/**
 * Servicio para crear un alumno
 */
exports.addAlumno = (email) => {
  return new Promise((resolve, reject) => {
    new Usuario()
      .where("email", email)
      .fetch({ withRelated: ["rol"] })
      .then((result) => {
        if (result === null) {
          reject(alumnoConstants(email).userNotFound);
        }
        let usuario = result.toJSON();
        if (usuario.rol.id === 2) {
          reject(alumnoConstants(email).alreadyAlumno);
        } else if (usuario.rol.id !== 1) {
          reject(
            alumnoConstants(email, usuario.rol.descripcion).notSupportedRol
          );
        }
        visitanteServices
          .deleteVisitante(email)
          .then(() => {
            usuarioServices
              .changeUsuarioRol(email, 2)
              .then(() => {
                const alumno = new Alumno({
                  email: email,
                });
                alumno
                  .save(null, { method: "insert" })
                  .then(() => {
                    resolve(alumnoConstants(email).addOK);
                  })
                  .catch((err) => {
                    reject(alumnoConstants().addError);
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
        reject(alumnoConstants().getProfesorError);
      });
  });
};

/**
 * Servicio para obtener los cursos de un alumno
 */
exports.getCursosAlumno = (emailAlumno) => {
  return new Promise((resolve, reject) => {
    new Alumno()
      .where("email", emailAlumno)
      .fetch({
        withRelated: [
          "cursos",
          "cursos.laboratorios",
          "cursos.profesor.usuario",
        ],
      })
      .then((cursos) => {
        resolve(cursos.toJSON());
      })
      .catch((err) => {
        console.log(err);
        reject(cursosConstants().errorCursoList);
      });
  });
};
