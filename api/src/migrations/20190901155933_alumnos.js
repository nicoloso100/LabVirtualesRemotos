exports.up = function(knex, Promise) {
  return knex.schema.createTable("alumnos", t => {
    t.string("email")
      .references("email")
      .inTable("users")
      .notNull()
      .primary();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("alumnos");
};
