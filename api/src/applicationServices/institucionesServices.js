//Models
const Institucion = require("../models/institucion");
//Constants
const institucionesConstants = require("../constants/institucionesConstants");

exports.getInstituciones = () => {
	return new Promise((resolve, reject) => {
		Institucion.fetchAll()
			.then(instituciones => {
				resolve(instituciones.toJSON());
			})
			.catch(err => {
				reject(institucionesConstants().getInstitucionesError);
			});
	});
};

exports.addInstitucion = nombre => {
	return new Promise((resolve, reject) => {
		Institucion.where("nombre", nombre)
			.fetch()
			.then(institucion => {
				if (institucion === null) {
					const institucion = new Institucion({
						nombre: nombre
					});
					institucion
						.save(null, { method: "insert" })
						.then(() => {
							resolve(institucionesConstants(nombre).successAddInstitucion);
						})
						.catch(err => {
							reject(institucionesConstants().errorAddInstitucion);
						});
				} else {
					reject(institucionesConstants(nombre).addInstitucionExists);
				}
			})
			.catch(err => {
				console.log(err);
			});
	});
};
