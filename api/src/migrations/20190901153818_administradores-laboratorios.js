exports.up = function(knex, Promise) {
  return knex.schema.createTable("administradores-laboratorios", t => {
    t.string("email")
      .references("email")
      .inTable("administradores")
      .notNull();
    t.bigInteger("laboratorio")
      .references("id")
      .inTable("laboratorios")
      .notNull();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("administradores-laboratorios");
};
