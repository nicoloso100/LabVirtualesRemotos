const db = require("../utils/database/databaseBookshelfConfig");
require("./institucion");
require("./usuario");

const Director = db.Model.extend({
  idAttribute: "email",
  tableName: "directores",
  institucion() {
    return this.belongsTo("Institucion", "institucion");
  },
  usuario() {
    return this.belongsTo("Usuario", "email");
  },
  profesor() {
    return this.hasMany("Profesor", "director");
  }
});

module.exports = db.model("Director", Director);
