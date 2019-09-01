exports.up = function(knex, Promise) {
  return knex.schema.createTable("profesores-laboratorios", t => {
    t.string("email")
      .references("email")
      .inTable("profesores")
      .notNull();
    t.bigInteger("laboratorio")
      .references("id")
      .inTable("laboratorios")
      .notNull();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("profesores-laboratorios");
};
