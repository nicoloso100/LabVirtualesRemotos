//Models
const Curso = require("../models/curso");
//Constants
const cursosConstants = require("../constants/cursosConstants");
//Services
const laboratoriosCursosService = require("../applicationServices/laboratoriosCursosService");
const alumnosCursosService = require("../applicationServices/alumnosCursosService");
const usuarioServices = require("../applicationServices/usuarioServices");
const alumnosService = require("../applicationServices/alumnosService");
const SplitBase64 = require("../utils/image/splitBase64");

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

exports.getCursosEstudiantes = profesor => {
	return new Promise((resolve, reject) => {
		new Curso()
			.where("profesor", profesor)
			.fetchAll({ withRelated: ["alumnos"] })
			.then(cursos => {
				resolve(cursos.toJSON());
			})
			.catch(err => {
				console.log(err);
				reject(cursosConstants().errorCursoList);
			});
	});
};

exports.getCursosLaboratorios = profesor => {
	return new Promise((resolve, reject) => {
		new Curso()
			.where("profesor", profesor)
			.fetchAll({ withRelated: ["laboratorios"] })
			.then(cursos => {
				resolve(cursos.toJSON());
			})
			.catch(err => {
				console.log(err);
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
								let labPromises = infoCurso.VincularLaboratorios.map(laboratorio => {
									return promiseLaboratoriosCursos(laboratorio.id, newCurso.id);
								});
								Promise.all(labPromises)
									.then(() => {
										let estudiantesPromises = infoCurso.VincularEstudiantes.map(alumno => {
											return this.addEstudiante(alumno.email, newCurso.id);
										});
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
		var base64Data = SplitBase64(image);
		let path = `public/cursos/curso_${id}.png`;
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
				console.log(err);
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
							console.log(err);
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
									console.log(err);
									reject(err);
								});
						})
						.catch(err => {
							console.log(err);
							reject(err);
						});
				}
			})
			.catch(err => {
				console.log(err);
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
							.then(() => {
								resolve(cursosConstants().deleteCursoOk);
							})
							.catch(err => {
								console.log(err);
								reject(cursosConstants().deleteCursoError);
							});
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
				console.log(err);
				reject(err);
			});
	});
};

exports.actualizarLaboratorios = (labList, idCurso) => {
	return new Promise((resolve, reject) => {
		laboratoriosCursosService
			.deleteByCurso(idCurso)
			.then(() => {
				let cursosLabsPromises = labList.map(lab => {
					return laboratoriosCursosService.addLaboratorioCurso(lab.id, idCurso);
				});
				Promise.all(cursosLabsPromises)
					.then(() => {
						resolve(cursosConstants().addLaboratoriosOk);
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
	});
};
