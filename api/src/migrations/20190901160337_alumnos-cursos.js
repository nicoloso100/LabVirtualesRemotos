exports.up = function(knex, Promise) {
  return knex.schema.createTable("alumnos_cursos", t => {
    t.primary(["alumno_email", "curso_id"]);
    t.string("alumno_email")
      .unsigned()
      .references("alumnos.email");
    t.bigInteger("curso_id")
      .unsigned()
      .references("cursos.id");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("alumnos_cursos");
};
