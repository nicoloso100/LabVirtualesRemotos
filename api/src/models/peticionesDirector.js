const db = require("../utils/database/databaseBookshelfConfig");
require("./visitante");

const PeticionDirector = db.Model.extend({
  idAttribute: "email",
  tableName: "peticionesDirectores",
  visitante() {
    return this.belongsTo("Visitante", "email");
  }
});

module.exports = db.model("PeticionDirector", PeticionDirector);
