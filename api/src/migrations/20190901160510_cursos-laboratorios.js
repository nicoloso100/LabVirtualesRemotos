exports.up = function(knex, Promise) {
  return knex.schema.createTable("cursos-laboratorios", t => {
    t.bigInteger("curso")
      .references("id")
      .inTable("cursos")
      .notNull();
    t.bigInteger("laboratorio")
      .references("id")
      .inTable("laboratorios")
      .notNull();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("cursos-laboratorios");
};
