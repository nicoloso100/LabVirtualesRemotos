//Models
const Curso = require("../models/curso");
//Constants
const cursosConstants = require("../constants/cursosConstants");

exports.getCursos = profesor => {
  return new Promise((resolve, reject) => {
    new Curso()
      .where("profesor", profesor)
      .fetchAll()
      .then(cursos => {
        resolve(cursos.toJSON());
      })
      .catch(err => {
        reject(cursosConstants().errorCursoList);
      });
  });
};

exports.addCurso = profesor => {
  return new Promise((resolve, reject) => {
    // new Curso()
    //   .where("profesor", profesor)
    //   .fetchAll()
    //   .then(cursos => {
    //     resolve(cursos.toJSON());
    //   })
    //   .catch(err => {
    //     reject(cursosConstants().errorCursoList);
    //   });
  });
};
