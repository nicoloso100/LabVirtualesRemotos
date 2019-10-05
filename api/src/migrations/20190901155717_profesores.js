exports.up = function(knex, Promise) {
  return knex.schema.createTable("profesores", t => {
    t.string("email")
      .references("email")
      .inTable("usuarios")
      .notNull()
      .primary();
    t.string("director")
      .references("email")
      .inTable("directores")
      .notNull();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("profesores");
};
