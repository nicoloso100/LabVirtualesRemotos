const db = require("../utils/database/databaseBookshelfConfig");
const Visitantes = require("./visitante");

const Laboratorios = db.Model.extend({
  tableName: "laboratorios",
  visitante() {
    return this.hasMany(Visitantes, "id");
  }
});

module.exports = Laboratorios;
