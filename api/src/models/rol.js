const db = require("../utils/database/databaseConfig");
const Users = require("./user");

const Roles = db.Model.extend({
  tableName: "roles",
  users: function() {
    return this.hasMany(Users, "id");
  }
});

module.exports = Roles;
