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
        console.log(cursos);
        resolve(cursos.toJSON());
      })
      .catch(err => {
        console.log(err);
        reject(cursosConstants().errorCursoList);
      });
  });
};
