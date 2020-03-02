const db = require("../utils/database/databaseBookshelfConfig");

const Curso = db.Model.extend({
	tableName: "cursos",
	profesor() {
		return this.belongsTo("Profesor", "profesor");
	},
	alumnos() {
		return this.belongsToMany("Alumno");
	},
	laboratorios() {
		return this.belongsToMany("Laboratorio");
	}
});

module.exports = db.model("Curso", Curso);
