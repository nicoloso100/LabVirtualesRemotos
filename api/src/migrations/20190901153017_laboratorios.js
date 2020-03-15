exports.up = function(knex, Promise) {
	return knex.schema.createTable("laboratorios", t => {
		t.increments("id")
			.unsigned()
			.notNull()
			.primary();
		t.string("nombre").notNull();
		t.string("descripcion").notNull();
		t.string("link").notNull();
		t.bigInteger("tipo")
			.references("id")
			.inTable("tiposLaboratorio")
			.notNull();
		t.string("tema").notNull();
		t.string("objetivo").notNull();
		t.string("comoRecolectarDatos").notNull();
		t.string("guiaDeMontaje").notNull();
		t.string("guiaPractica").notNull();
		t.string("imagen").notNull();
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTable("laboratorios");
};
