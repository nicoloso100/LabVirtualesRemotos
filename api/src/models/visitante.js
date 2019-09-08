const db = require("../utils/database/databaseBookshelfConfig");
const Usuarios = require("./usuario");
const Laboratorio = require("./laboratorios");
const PeticionDirector = require("./peticionesDirector");

const Visitante = db.Model.extend({
  idAttribute: false,
  tableName: "visitantes",
  usuarios() {
    return this.belongsTo(Usuarios, "email");
  },
  laboratorio() {
    return this.belongsTo(Laboratorio, "laboratorio");
  },
  peticionDirector() {
    return this.hasOne(PeticionDirector, "email");
  }
});

module.exports = Visitante;
