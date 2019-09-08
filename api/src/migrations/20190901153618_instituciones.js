exports.up = function(knex, Promise) {
  return knex.schema.createTable("instituciones", t => {
    t.increments("id")
      .unsigned()
      .notNull()
      .primary();
    t.string("nombre").notNull();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("instituciones");
};
