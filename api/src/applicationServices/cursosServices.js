//Models
const Curso = require("../models/curso");
//Constants
const cursosConstants = require("../constants/cursosConstants");
//Services
const laboratoriosCursosService = require("../applicationServices/laboratoriosCursosService");
const alumnosCursosService = require("../applicationServices/alumnosCursosService");
const usuarioServices = require("../applicationServices/usuarioServices");
const alumnosService = require("../applicationServices/alumnosService");

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

exports.addCurso = infoCurso => {
  return new Promise((resolve, reject) => {
    const curso = new Curso({
      profesor: infoCurso.Profesor,
      nombre: infoCurso.InformacionCurso.nombre,
      descripcion: infoCurso.InformacionCurso.descripcion,
      imagen: "",
      year: infoCurso.InformacionCurso.year,
      periodo: infoCurso.InformacionCurso.periodo
    });
    curso
      .save(null, { method: "insert" })
      .then(newCurso => {
        let labPromises = infoCurso.VincularLaboratorios.map(element => {
          laboratoriosCursosService
            .addLaboratorioCurso(element.id, newCurso.id)
            .then()
            .catch(err => {
              reject(err);
            });
        });
        Promise.all(labPromises)
          .then(() => {
            let estudiantesPromises = infoCurso.VincularEstudiantes.map(
              alumno => {
                usuarioServices
                  .getUsuario(alumno.email)
                  .then(getUsuario => {
                    if (getUsuario.rol === "estudiante") {
                      alumnosCursosService
                        .addAlumnoCurso(getUsuario.email)
                        .then()
                        .catch(err => {
                          reject(err);
                        });
                    } else {
                      alumnosService
                        .addAlumno(getUsuario.email)
                        .then(newAlumno => {
                          alumnosCursosService
                            .addAlumnoCurso(newAlumno.email)
                            .then()
                            .catch(err => {
                              reject(err);
                            });
                        })
                        .catch(err => {
                          reject(err);
                        });
                    }
                  })
                  .catch(err => {
                    reject(err);
                  });
              }
            );
            Promise.all(estudiantesPromises)
              .then(() => {
                resolve(cursosConstants().createCursoOk);
              })
              .catch(err => {
                console.log(err);
                reject(err);
              });
          })
          .catch(err => {
            console.log(err);
            reject(err);
          });
      })
      .catch(err => {
        console.log(err);
        reject(cursosConstants().errorCreateCurso);
      });
  });
};
