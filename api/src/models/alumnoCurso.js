const db = require("../utils/database/databaseBookshelfConfig");
require("./curso");

const AlumnoCurso = db.Model.extend({
  idAttribute: ["alumno_email", "curso_id"],
  tableName: "alumnos_cursos"
});

module.exports = db.model("AlumnoCurso", AlumnoCurso);
