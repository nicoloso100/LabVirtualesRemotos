exports.up = function(knex, Promise) {
  return knex.schema.createTable("visitantes", t => {
    t.string("email")
      .references("email")
      .inTable("users")
      .notNull()
      .primary();
    t.bigInteger("laboratorio")
      .references("id")
      .inTable("laboratorios")
      .notNull();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("visitantes");
};
