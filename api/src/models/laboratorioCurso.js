const db = require("../utils/database/databaseBookshelfConfig");
require("./laboratorio");
require("./curso");

const LaboratorioCurso = db.Model.extend({
  idAttribute: ["curso", "laboratorio"],
  tableName: "cursos-laboratorios",
  laboratorio() {
    return this.belongsTo("Laboratorio", "laboratorio");
  },
  curso() {
    return this.belongsTo("Curso", "curso");
  }
});

module.exports = db.model("LaboratorioCurso", LaboratorioCurso);
