exports.up = function(knex, Promise) {
  return knex.schema.createTable("profesores", t => {
    t.string("email")
      .references("email")
      .inTable("users")
      .notNull()
      .primary();
    t.bigInteger("institucion")
      .references("id")
      .inTable("instituciones")
      .notNull();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("profesores");
};
