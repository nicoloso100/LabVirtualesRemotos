const db = require("../utils/database/databaseBookshelfConfig");
require("./usuario");

const Rol = db.Model.extend({
  tableName: "roles",
  usuarios() {
    return this.hasMany("Usuario", "id");
  }
});

module.exports = db.model("Rol", Rol);
