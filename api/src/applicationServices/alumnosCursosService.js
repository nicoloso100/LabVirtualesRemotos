//Models
const AlumnoCurso = require("../models/alumnoCurso");
//Constants
const alumnosCursosConstants = require("../constants/alumnosCursosConstants");

exports.addAlumnoCurso = (emailAlumno, idCurso) => {
  return new Promise((resolve, reject) => {
    new AlumnoCurso()
      .where({
        curso_id: idCurso,
        alumno_email: emailAlumno
      })
      .fetchAll()
      .then(result => {
        if (result.length !== 0) {
          reject(alumnosCursosConstants(emailAlumno).addAlumnCursoExists);
        } else {
          const alumnoCurso = new AlumnoCurso({
            curso_id: idCurso,
            alumno_email: emailAlumno
          });
          alumnoCurso
            .save(null, { method: "insert" })
            .then(() => {
              resolve();
            })
            .catch(err => {
              console.log(err);
              reject(alumnosCursosConstants().addAlumnCursoError);
            });
        }
      });
  });
};

exports.deleteAlumnoCurso = (emailAlumno, idCurso) => {
  return new Promise((resolve, reject) => {
    new AlumnoCurso()
      .where({
        curso_id: idCurso,
        alumno_email: emailAlumno
      })
      .fetchAll()
      .then(result => {
        if (result.length === 0) {
          resolve(alumnosCursosConstants(emailAlumno).deleteAlumnCursoNotExist);
        } else {
          new AlumnoCurso()
            .where({
              alumno_email: emailAlumno,
              curso_id: idCurso
            })
            .destroy()
            .then(() => {
              resolve(alumnosCursosConstants(emailAlumno).deleteAlumnCursoOk);
            })
            .catch(err => {
              console.log(err);
              reject(alumnosCursosConstants().deleteAlumnCursoError);
            });
        }
      })
      .catch(err => {
        console.log(err);
        reject(alumnosCursosConstants().deleteAlumnCursoError);
      });
  });
};

exports.deleteByCurso = idCurso => {
  return new Promise((resolve, reject) => {
    new AlumnoCurso()
      .where("curso_id", idCurso)
      .fetchAll()
      .then(result => {
        if (result.length === 0) {
          resolve(alumnosCursosConstants().deleteAllAlumnCursoOk);
        } else {
          new AlumnoCurso()
            .where("curso_id", idCurso)
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
