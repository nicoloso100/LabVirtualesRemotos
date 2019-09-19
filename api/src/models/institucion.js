const db = require("../utils/database/databaseBookshelfConfig");
require("./director");

const Institucion = db.Model.extend({
  tableName: "instituciones",
  director() {
    return this.hasMany("Director", "id");
  }
});

module.exports = db.model("Institucion", Institucion);
