exports.seed = function(knex, Promise) {
	// Deletes ALL existing entries
	return knex("laboratorios")
		.del()
		.then(function() {
			// Inserts seed entries
			return knex("laboratorios").insert([
				{
					id: 1,
					nombre: "Experimento de Young",
					descripcion: "descripcion experimento de young",
					link: "https://andreslargo.com/GLV/",
					tipo: 1,
					imagen: "/public/images/laboratorios/lab_1.jpg"
				},
				{
					id: 2,
					nombre: "Experimento de Young2",
					descripcion: "descripcion experimento de young2",
					link: "https://andreslargo.com/GLV/",
					tipo: 1,
					imagen: "/public/images/laboratorios/lab_1.jpg"
				}
			]);
		});
};
