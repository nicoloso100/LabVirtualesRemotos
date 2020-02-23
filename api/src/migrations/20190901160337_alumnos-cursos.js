exports.up = function(knex, Promise) {
  return knex.schema.createTable("alumnos-cursos", t => {
    t.primary(["email", "curso"]);
    t.string("email")
      .references("email")
      .inTable("alumnos")
      .notNull();
    t.bigInteger("curso")
      .references("id")
      .inTable("cursos")
      .notNull();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("alumnos-cursos");
};
