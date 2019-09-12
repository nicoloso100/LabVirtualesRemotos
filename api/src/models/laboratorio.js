const db = require("../utils/database/databaseBookshelfConfig");
require("./visitante");
require("./tiposLaboratorio");

const Laboratorio = db.Model.extend({
  tableName: "laboratorios",
  visitante() {
    return this.hasMany("Visitante", "id");
  },
  tipo() {
    return this.belongsTo("TiposLaboratorio", "tipo");
  }
});

module.exports = db.model("Laboratorio", Laboratorio);
