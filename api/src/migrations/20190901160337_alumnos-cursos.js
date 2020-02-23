exports.up = function(knex, Promise) {
  return knex.schema.createTable("alumnos-cursos", t => {
    t.primary(["email", "curso"]);
    t.string("email")
      .unsigned()
      .references("alumnos.email")
    t.bigInteger("curso")
      .unsigned()
      .references("cursos.id")
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("alumnos-cursos");
};
