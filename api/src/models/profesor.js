const db = require("../utils/database/databaseBookshelfConfig");
require("./usuario");

const Profesor = db.Model.extend({
  idAttribute: "email",
  tableName: "profesores",
  usuario() {
    return this.belongsTo("Usuario", "email");
  },
  director() {
    return this.belongsTo("Director", "email");
  },
  curso() {
    return this.hasMany("Curso", "email");
  }
});

module.exports = db.model("Profesor", Profesor);
