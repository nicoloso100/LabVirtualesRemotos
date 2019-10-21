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
