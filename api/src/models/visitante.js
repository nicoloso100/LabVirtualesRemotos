const db = require("../utils/database/databaseBookshelfConfig");
require("./usuario");
require("./laboratorio");
require("./peticionesDirector");

const Visitante = db.Model.extend({
  idAttribute: "email",
  tableName: "visitantes",
  usuario() {
    return this.belongsTo("Usuario", "email");
  },
  laboratorio() {
    return this.belongsTo("Laboratorio", "laboratorio");
  },
  peticionDirector() {
    return this.hasOne("PeticionDirector", "email");
  }
});

module.exports = db.model("Visitante", Visitante);
