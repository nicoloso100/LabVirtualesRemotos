exports.up = function(knex, Promise) {
  return knex.schema.createTable("peticionesDirectores", t => {
    t.string("email")
      .references("email")
      .inTable("visitantes")
      .notNull()
      .primary();
    t.string("institucion").notNull();
    t.string("mensaje").notNull();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("peticionesDirectores");
};
