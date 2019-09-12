const db = require("../utils/database/databaseBookshelfConfig");
require("./laboratorio");

const TiposLaboratorio = db.Model.extend({
  tableName: "tiposLaboratorio",
  laboratorio: function() {
    return this.hasMany("Laboratorio", "id");
  }
});

module.exports = db.model("TiposLaboratorio", TiposLaboratorio);
