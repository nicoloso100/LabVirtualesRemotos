exports.up = function(knex, Promise) {
  return knex.schema.createTable("profesores-directores", t => {
    t.string("email")
      .references("email")
      .inTable("profesores")
      .notNull()
      .primary();
    t.string("director")
      .references("email")
      .inTable("directores")
      .notNull();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("profesores-directores");
};
