//Models
const LaboratorioCurso = require("../models/laboratorioCurso");
//Constants
const laboratoriosCursosConstants = require("../constants/laboratoriosCursosConstants");

exports.addLaboratorioCurso = (idLaboratorio, idCurso) => {
	return new Promise((resolve, reject) => {
		const laboratorioCurso = new LaboratorioCurso({
			curso: idCurso,
			laboratorio: idLaboratorio
		});
		laboratorioCurso
			.save(null, { method: "insert" })
			.then(() => {
				resolve();
			})
			.catch(err => {
				reject(laboratoriosCursosConstants().addLabCursoError);
			});
	});
};

exports.deleteByCurso = idCurso => {
	return new Promise((resolve, reject) => {
		new LaboratorioCurso()
			.where("curso", idCurso)
			.fetchAll()
			.then(result => {
				if (result.length === 0) {
					resolve(laboratoriosCursosConstants().deleteLabCursoOk);
				} else {
					new LaboratorioCurso()
						.where("curso", idCurso)
						.destroy()
						.then(() => {
							resolve(laboratoriosCursosConstants().deleteLabCursoOk);
						})
						.catch(err => {
							reject(laboratoriosCursosConstants().deleteLabCursoError);
						});
				}
			});
	});
};
