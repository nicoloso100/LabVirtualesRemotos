exports.up = function(knex, Promise) {
  return knex.schema.createTable("directores-laboratorios", t => {
    t.string("email")
      .references("email")
      .inTable("directores")
      .notNull();
    t.bigInteger("laboratorio")
      .references("id")
      .inTable("laboratorios")
      .notNull();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("directores-laboratorios");
};
