const db = require("../utils/database/databaseConfig");

const Usuarios = db.Model.extend({
  idAttribute: false,
  tableName: "users",
  hasSecurePassword: true
});

module.exports = Usuarios;
