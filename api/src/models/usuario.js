const db = require("../utils/database/databaseBookshelfConfig");
const Roles = require("./rol");
const Visitantes = require("./visitante");

const User = db.Model.extend({
  idAttribute: false,
  tableName: "usuarios",
  hasSecurePassword: true,
  roles() {
    return this.belongsTo(Roles, "rol");
  },
  visitante() {
    return this.hasMany(Visitantes, "email");
  }
});

module.exports = User;
