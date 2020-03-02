const db = require("../utils/database/databaseBookshelfConfig");
require("./laboratorio");
require("./curso");

const LaboratorioCurso = db.Model.extend({
	idAttribute: ["curso_id", "laboratorio_id"],
	tableName: "cursos_laboratorios",
	laboratorio() {
		return this.belongsTo("Laboratorio", "laboratorio_id");
	},
	curso() {
		return this.belongsTo("Curso", "curso_id");
	}
});

module.exports = db.model("LaboratorioCurso", LaboratorioCurso);
