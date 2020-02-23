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
        saveImage(infoCurso.ImagenCurso, newCurso.id)
          .then(path => {
            newCurso.set("imagen", path);
            newCurso
              .save()
              .then(() => {
                let labPromises = infoCurso.VincularLaboratorios.map(
                  laboratorio => {
                    return promiseLaboratoriosCursos(
                      laboratorio.id,
                      newCurso.id
                    );
                  }
                );
                Promise.all(labPromises)
                  .then(() => {
                    let estudiantesPromises = infoCurso.VincularEstudiantes.map(
                      alumno => {
                        return addEstudiante(alumno.email, newCurso.id);
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
                reject(cursosConstants().errorImage);
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

exports.editCurso = infoCurso => {
  return new Promise((resolve, reject) => {
    Curso.where({ id: infoCurso.Id })
      .save(
        {
          profesor: infoCurso.Profesor,
          nombre: infoCurso.InformacionCurso.nombre,
          descripcion: infoCurso.InformacionCurso.descripcion,
          year: infoCurso.InformacionCurso.year,
          periodo: infoCurso.InformacionCurso.periodo,
          imagen: ""
        },
        { method: "update" },
        { patch: true }
      )
      .then(() => {
        saveImage(infoCurso.ImagenCurso, infoCurso.Id)
          .then(path => {
            Curso.where({ id: infoCurso.Id })
              .save({ imagen: path }, { method: "update" }, { patch: true })
              .then(() => {
                resolve(cursosConstants().editCursoOk);
              })
              .catch(err => {
                reject(cursosConstants().errorImage);
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

const saveImage = (image, id) => {
  return new Promise((resolve, reject) => {
    var base64Data = image.replace(/^data:image\/png;base64,/, "");
    let path = `public/images/cursos/curso_${id}.jpg`;
    require("fs").writeFile(path, base64Data, "base64", err => {
      if (err) {
        reject(cursosConstants().errorImage);
      } else {
        resolve(`/${path}`);
      }
    });
  });
};

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

exports.addEstudiante = (emailAlumno, idCurso) => {
  return new Promise((resolve, reject) => {
    usuarioServices
      .getUsuario(emailAlumno)
      .then(getUsuario => {
        if (getUsuario.rol === "estudiante") {
          alumnosCursosService
            .addAlumnoCurso(getUsuario.email, idCurso)
            .then(() => {
              resolve(cursosConstants(getUsuario.email).addEstudianteOk);
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
                .then(() => {
                  resolve(cursosConstants(getUsuario.email).addEstudianteOk);
                })
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

exports.deleteCurso = idCurso => {
  return new Promise((resolve, reject) => {
    laboratoriosCursosService
      .deleteByCurso(idCurso)
      .then(() => {
        alumnosCursosService
          .deleteByCurso(idCurso)
          .then(() => {
            new Curso({ id: idCurso })
              .destroy()
              .then(curso => {
                resolve(cursosConstants().deleteCursoOk);
              })
              .catch(err => {
                reject(cursosConstants().deleteCursoError);
              });
          })
          .catch(err => {
            reject(err);
          });
      })
      .catch(err => {
        reject(err);
      });
  });
};

exports.deleteEstudiante = (emailAlumno, idCurso) => {
  return new Promise((resolve, reject) => {
    alumnosCursosService
      .deleteAlumnoCurso(emailAlumno, idCurso)
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};
