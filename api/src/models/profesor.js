const db = require("../utils/database/databaseBookshelfConfig");
require("./usuario");

const Profesor = db.Model.extend({
	idAttribute: "email",
	tableName: "profesores",
	usuario() {
		return this.belongsTo("Usuario", "email");
	},
	director() {
		return this.belongsTo("Director", "director");
	},
	curso() {
		return this.hasMany("Curso", "profesor");
	}
});

module.exports = db.model("Profesor", Profesor);
