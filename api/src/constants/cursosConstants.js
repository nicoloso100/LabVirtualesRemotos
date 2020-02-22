const CursosConstants = (param1, param2) => {
	return {
		errorCursoList: "No se ha podido obtener la lista de cursos",
		errorCreateCurso: "Ha ocurrido un error al crear el curso, por favor inténtelo nuevamente",
		createCursoOk: "El curso se ha creado correctamente",
		editCursoOk: "El curso se ha modificado correctamente",
		errorImage: "No se ha podido guardar la imágen",
		deleteCursoOk: `El curso se ha eliminado satisfactoriamente`,
		deleteCursoError: `Ha ocurrido un error al eliminar el curso, intente nuevamente`
	};
};

module.exports = CursosConstants;
