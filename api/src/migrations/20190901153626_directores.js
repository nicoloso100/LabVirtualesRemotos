exports.up = function(knex, Promise) {
  return knex.schema.createTable("directores", t => {
    t.string("email")
      .references("email")
      .inTable("usuarios")
      .notNull()
      .primary();
    t.bigInteger("institucion")
      .references("id")
      .inTable("instituciones")
      .notNull();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("directores");
};
