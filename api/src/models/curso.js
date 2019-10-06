const db = require("../utils/database/databaseBookshelfConfig");

const Curso = db.Model.extend({
  tableName: "cursos",
  profesor() {
    return this.belongsTo("Profesor", "profesor");
  }
});

module.exports = db.model("Curso", Curso);