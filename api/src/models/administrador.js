const db = require("../utils/database/databaseBookshelfConfig");
require("./usuario");

const Administrador = db.Model.extend({
  idAttribute: false,
  tableName: "administradores",
  usuario: function() {
    return this.belongsTo("Usuario", "email");
  }
});

module.exports = db.model("Administrador", Administrador);
