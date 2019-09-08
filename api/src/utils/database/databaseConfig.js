const config = require("../environment").knexConfig;
const knex = require("knex");

const options = {
  client: "pg",
  connection: config,
  pool: {
    min: 0,
    max: 50
  }
};

module.exports = knex(options);
