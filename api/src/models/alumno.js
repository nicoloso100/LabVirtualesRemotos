const db = require("../utils/database/databaseBookshelfConfig");
require("./usuario");

const Alumno = db.Model.extend({
  idAttribute: "email",
  tableName: "alumnos",
  usuario() {
    return this.belongsTo("Usuario", "email");
  },
  cursos(){
    return this.belongsToMany("Curso", "email");
  }
});

module.exports = db.model("Alumno", Alumno);
