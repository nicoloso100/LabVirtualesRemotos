const db = require("../utils/database/databaseBookshelfConfig");
const Visitante = require("./visitante");

const PeticionDirector = db.Model.extend({
  idAttribute: false,
  tableName: "peticionesDirectores",
  visitante() {
    return this.belongsTo(Visitante, "email");
  }
});

module.exports = PeticionDirector;
