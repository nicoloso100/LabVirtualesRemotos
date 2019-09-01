const db = require("../utils/database/databaseConfig");
const Roles = require("./rol");

const User = db.Model.extend({
  idAttribute: false,
  tableName: "users",
  hasSecurePassword: true,
  roles() {
    return this.belongsTo(Roles, "rol");
  }
});

module.exports = User;
