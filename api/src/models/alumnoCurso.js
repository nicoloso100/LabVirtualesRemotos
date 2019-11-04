const db = require("../utils/database/databaseBookshelfConfig");
require("./curso");

const AlumnoCurso = db.Model.extend({
  idAttribute: ["email", "curso"],
  tableName: "alumnos-cursos",
  curso() {
    return this.belongsTo("Curso", "curso");
  }
});

module.exports = db.model("AlumnoCurso", AlumnoCurso);
