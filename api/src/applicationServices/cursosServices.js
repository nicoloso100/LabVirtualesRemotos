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
      year: infoCurso.InformacionCurso.year,
      periodo: infoCurso.InformacionCurso.periodo,
      imagen: ""
    });
    curso
      .save(null, { method: "insert" })
      .then(newCurso => {
        let labPromises = infoCurso.VincularLaboratorios.map(laboratorio => {
          return promiseLaboratoriosCursos(laboratorio.id, newCurso.id);
        });
        Promise.all(labPromises)
          .then(() => {
            let estudiantesPromises = infoCurso.VincularEstudiantes.map(
              alumno => {
                return proimiseEstudiantesLaboratorios(
                  alumno.email,
                  newCurso.id
                );
              }
            );
            Promise.all(estudiantesPromises)
              .then(() => {
                resolve(cursosConstants().createCursoOk);
              })
              .catch(err => {
                reject(err);
              });
          })
          .catch(err => {
            reject(err);
          });
      })
      .catch(err => {
        reject(cursosConstants().errorCreateCurso);
      });
  });
};

const saveImage = () => {};

const promiseLaboratoriosCursos = (idLab, idCurso) => {
  return new Promise((resolve, reject) => {
    laboratoriosCursosService
      .addLaboratorioCurso(idLab, idCurso)
      .then(() => {
        resolve();
      })
      .catch(err => {
        reject(err);
      });
  });
};

const proimiseEstudiantesLaboratorios = (emailAlumno, idCurso) => {
  return new Promise((resolve, reject) => {
    usuarioServices
      .getUsuario(emailAlumno)
      .then(getUsuario => {
        if (getUsuario.rol === "estudiante") {
          alumnosCursosService
            .addAlumnoCurso(getUsuario.email, idCurso)
            .then(() => {
              resolve();
            })
            .catch(err => {
              reject(err);
            });
        } else {
          alumnosService
            .addAlumno(getUsuario.email)
            .then(() => {
              alumnosCursosService
                .addAlumnoCurso(getUsuario.email, idCurso)
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
  });
};
