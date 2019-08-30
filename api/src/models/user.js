const db = require("../utils/database/databaseConfig");

const User = db.Model.extend({
  idAttribute: false,
  tableName: "users",
  hasSecurePassword: true
});

module.exports = User;
