const db = require("../utils/database/databaseBookshelfConfig");
require("./curso");

const AlumnoCurso = db.Model.extend({
  idAttribute: ["email", "curso"],
  tableName: "alumnos-cursos",
  curso() {
    return this.belongsTo("Curso", "curso");
  },
  alumno(){
    return this.belongsTo("Alumno", "email");
  }
});

module.exports = db.model("AlumnoCurso", AlumnoCurso);
