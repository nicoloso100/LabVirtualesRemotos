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

exports.deleteByCurso = idCurso => {
	return new Promise((resolve, reject) => {
		new AlumnoCurso()
			.where("curso", idCurso)
			.fetchAll()
			.then(result => {
				if (result.length === 0) {
					resolve(alumnosCursosConstants().deleteAlumnCursoOk);
				} else {
					new AlumnoCurso()
						.where("curso", idCurso)
						.destroy()
						.then(() => {
							resolve(alumnosCursosConstants().deleteAlumnCursoOk);
						})
						.catch(err => {
							reject(alumnosCursosConstants().deleteAlumnCursoError);
						});
				}
			});
	});
};
