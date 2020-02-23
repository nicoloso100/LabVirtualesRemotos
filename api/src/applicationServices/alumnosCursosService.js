//Models
const AlumnoCurso = require("../models/alumnoCurso");
//Constants
const alumnosCursosConstants = require("../constants/alumnosCursosConstants");

exports.addAlumnoCurso = (emailAlumno, idCurso) => {
  return new Promise((resolve, reject) => {
    const alumnoCurso = new AlumnoCurso({
      curso: idCurso,
      email: emailAlumno
    });
    alumnoCurso
      .save(null, { method: "insert" })
      .then(() => {
        resolve();
      })
      .catch(err => {
        reject(alumnosCursosConstants().addAlumnCursoError);
      });
  });
};

exports.deleteAlumnoCurso = (emailAlumno, idCurso) => {
  return new Promise((resolve, reject) => {
    new AlumnoCurso()
      .where({
        curso: idCurso,
        email: emailAlumno
      })
      .fetchAll()
      .then(result => {
        if (result.length === 0) {
          resolve(alumnosCursosConstants(emailAlumno).deleteAlumnCursoNotExist);
        } else {
          new AlumnoCurso()
            .where("curso", idCurso)
            .destroy()
            .then(() => {
              resolve(alumnosCursosConstants(emailAlumno).deleteAlumnCursoOk);
            })
            .catch(err => {
              reject(alumnosCursosConstants().deleteAlumnCursoError);
            });
        }
      })
      .catch(err => {
        reject(alumnosCursosConstants().deleteAlumnCursoError);
      });
  });
};

exports.deleteByCurso = idCurso => {
  return new Promise((resolve, reject) => {
    new AlumnoCurso()
      .where("curso", idCurso)
      .fetchAll()
      .then(result => {
        if (result.length === 0) {
          resolve(alumnosCursosConstants().deleteAllAlumnCursoOk);
        } else {
          new AlumnoCurso()
            .where("curso", idCurso)
            .destroy()
            .then(() => {
              resolve(alumnosCursosConstants().deleteAllAlumnCursoOk);
            })
            .catch(err => {
              reject(alumnosCursosConstants().deleteAllAlumnCursoError);
            });
        }
      });
  });
};
