const db = require("../utils/database/databaseBookshelfConfig");
require("./rol");
require("./administrador");

const Usuario = db.Model.extend({
  idAttribute: "email",
  tableName: "usuarios",
  hasSecurePassword: true,
  rol() {
    return this.belongsTo("Rol", "rol");
  },
  administrador: function() {
    return this.hasMany("Administrador", "email");
  }
});

module.exports = db.model("Usuario", Usuario);
