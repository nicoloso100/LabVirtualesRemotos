const db = require("../utils/database/databaseBookshelfConfig");
require("./institucion");

const Director = db.Model.extend({
  idAttribute: "email",
  tableName: "directores",
  institucion: function() {
    return this.belongsTo("Institucion", "institucion");
  }
});

module.exports = db.model("Director", Director);
