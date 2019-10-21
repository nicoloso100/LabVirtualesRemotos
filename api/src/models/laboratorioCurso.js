const db = require("../utils/database/databaseBookshelfConfig");
require("./laboratorio");
require("./curso");

const LaboratorioCurso = db.Model.extend({
  tableName: "cursos-laboratorios",
  laboratorio() {
    return this.belongsTo("Laboratorio", "laboratorio");
  },
  curso() {
    return this.belongsTo("Curso", "curso");
  }
});

module.exports = db.model("LaboratorioCurso", LaboratorioCurso);
