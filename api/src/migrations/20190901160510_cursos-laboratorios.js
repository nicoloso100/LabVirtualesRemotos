exports.up = function(knex, Promise) {
	return knex.schema.createTable("cursos_laboratorios", t => {
		t.primary(["curso_id", "laboratorio_id"]);
		t.bigInteger("curso_id")
			.unsigned()
			.references("cursos.id");
		t.bigInteger("laboratorio_id")
			.unsigned()
			.references("laboratorios.id");
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTable("cursos_laboratorios");
};
