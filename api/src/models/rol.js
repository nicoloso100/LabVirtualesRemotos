const db = require("../utils/database/databaseBookshelfConfig");
const Usuarios = require("./usuario");

const Roles = db.Model.extend({
  tableName: "roles",
  usuarios: function() {
    return this.hasMany(Usuarios, "id");
  }
});

module.exports = Roles;
