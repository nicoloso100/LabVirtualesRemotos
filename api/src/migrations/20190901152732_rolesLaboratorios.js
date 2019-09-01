exports.up = function(knex, Promise) {
  return knex.schema.createTable("rolesLaboratorios", t => {
    t.increments("id")
      .unsigned()
      .notNull()
      .primary();
    t.string("descripcion").notNull();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("rolesLaboratorios");
};
