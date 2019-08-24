const config = require("../../utils/environment").knexConfig;

const knex = require("knex");
const knexDb = knex({
  client: "pg",
  connection: config,
  pool: {
    min: 0,
    max: 50
  }
});
const securePassword = require("bookshelf-secure-password");
const db = require("bookshelf")(knexDb);
db.plugin(securePassword);

module.exports = db;
