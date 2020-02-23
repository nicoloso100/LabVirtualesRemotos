const AlumnosCursosConstants = param => {
  return {
    addAlumnCursoError:
      "Ha ocurrido un error al realizar la asociación de los estudiantes, por favor comuníquese con un administrador",
    addAlumnCursoExists: `El estudiante ${param} ya está inscrito al curso`,
    deleteAlumnCursoOk: `se ha desvinculado correctamente el estudiante ${param} del curso`,
    deleteAlumnCursoNotExist: `El estudiante ${param} no está inscrito al curso`,
    deleteAlumnCursoError:
      "No se ha podido desvincular correctamente el estudiante del curso",
    deleteAllAlumnCursoOk:
      "se han desvinculado correctamente los estudiantes del curso",
    deleteAllAlumnCursoError:
      "No se han podido desvincular correctamente los estudiantes del curso"
  };
};

module.exports = AlumnosCursosConstants;
