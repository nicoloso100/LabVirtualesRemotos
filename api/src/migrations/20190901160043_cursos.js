exports.up = function(knex, Promise) {
  return knex.schema.createTable("cursos", t => {
    t.increments("id")
      .unsigned()
      .notNull()
      .primary();
    t.string("profesor")
      .references("email")
      .inTable("profesores")
      .notNull();
    t.string("nombre").notNull();
    t.string("descripcion").notNull();
    t.string("imagen").notNull();
    t.integer("year").notNull();
    t.string("periodo").notNull();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("cursos");
};
