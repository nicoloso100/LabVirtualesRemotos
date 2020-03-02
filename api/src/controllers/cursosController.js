//Constants
const generalConstants = require("../constants/generalConstants");
//Services
const cursosServices = require("../applicationServices/cursosServices");

exports.get_cursos = (req, res) => {
	if (!req.body.profesor) {
		return res.status(500).send(generalConstants().missingFields);
	}
	cursosServices
		.getCursos(req.body.profesor)
		.then(result => {
			return res.send(result);
		})
		.catch(err => {
			return res.status(500).send(err);
		});
};

exports.get_cursosAlumnos = (req, res) => {
	if (!req.body.profesor) {
		return res.status(500).send(generalConstants().missingFields);
	}
	cursosServices
		.getCursosEstudiantes(req.body.profesor)
		.then(result => {
			return res.send(result);
		})
		.catch(err => {
			return res.status(500).send(err);
		});
};

exports.get_cursosLaboratorios = (req, res) => {
	if (!req.body.profesor) {
		return res.status(500).send(generalConstants().missingFields);
	}
	cursosServices
		.getCursosLaboratorios(req.body.profesor)
		.then(result => {
			return res.send(result);
		})
		.catch(err => {
			return res.status(500).send(err);
		});
};

exports.add_curso = (req, res) => {
	if (!req.body.Profesor || !req.body.ImagenCurso || !req.body.InformacionCurso || !req.body.VincularEstudiantes || !req.body.VincularLaboratorios) {
		return res.status(500).send(generalConstants().missingFields);
	}
	cursosServices
		.addCurso(req.body)
		.then(result => {
			return res.send(result);
		})
		.catch(err => {
			return res.status(500).send(err);
		});
};

exports.edit_curso = (req, res) => {
	if (!req.body.Id || !req.body.Profesor || !req.body.ImagenCurso || !req.body.InformacionCurso) {
		return res.status(500).send(generalConstants().missingFields);
	}
	cursosServices
		.editCurso(req.body)
		.then(result => {
			return res.send(result);
		})
		.catch(err => {
			return res.status(500).send(err);
		});
};

exports.delete_curso = (req, res) => {
	if (!req.body.idCurso) {
		return res.status(500).send(generalConstants().missingFields);
	}
	cursosServices
		.deleteCurso(req.body.idCurso)
		.then(result => {
			return res.send(result);
		})
		.catch(err => {
			return res.status(500).send(err);
		});
};

exports.add_estudiante = (req, res) => {
	if (!req.body.emailAlumno || !req.body.idCurso) {
		return res.status(500).send(generalConstants().missingFields);
	}
	cursosServices
		.addEstudiante(req.body.emailAlumno, req.body.idCurso)
		.then(result => {
			return res.send(result);
		})
		.catch(err => {
			return res.status(500).send(err);
		});
};

exports.delete_estudiante = (req, res) => {
	if (!req.body.emailAlumno || !req.body.idCurso) {
		return res.status(500).send(generalConstants().missingFields);
	}
	cursosServices
		.deleteEstudiante(req.body.emailAlumno, req.body.idCurso)
		.then(result => {
			return res.send(result);
		})
		.catch(err => {
			return res.status(500).send(err);
		});
};

exports.add_laboratorios = (req, res) => {
	if (!req.body.listaLaboratorios || !req.body.idCurso) {
		return res.status(500).send(generalConstants().missingFields);
	}
	cursosServices
		.actualizarLaboratorios(req.body.listaLaboratorios, req.body.idCurso)
		.then(result => {
			return res.send(result);
		})
		.catch(err => {
			return res.status(500).send(err);
		});
};
