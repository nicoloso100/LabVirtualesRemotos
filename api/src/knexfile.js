const config = require("./utils/environment").knexConfig;

module.exports = {
  development: {
    client: "pg",
    connection: config,
    pool: { min: 0, max: 50 }
  }
};
