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
					descripcion: "Medición de la longitud de la onda de un láser",
					link: "https://dev.andreslargo.com/young/",
					tipo: 1,
					tema: "Física Óptica y Ondulatoria",
					objetivo: "Calcular la longitud de onda de la luz de un puntero de diodo láser utilizando una rejilla de difracción",
					comoRecolectarDatos: "/public/laboratorios/experimentoYoug/guia.pdf",
					guiaDeMontaje: "/public/laboratorios/experimentoYoug/guia.pdf",
					guiaPractica: "/public/laboratorios/experimentoYoug/guia.pdf",
					imagen: "/public/laboratorios/experimentoYoug/imagen.jpg"
				},
				{
					id: 2,
					nombre: "Campo Eléctrico",
					descripcion: "Medición del campo eléctrico mediante papel milimetrado",
					link: "https://dev.andreslargo.com/young/",
					tipo: 2,
					tema: "Física Electricidad y Magnetismo",
					objetivo:
						"Determinar experimentalmente las líneas de campo eléctrico para una determinada configuración de electrodos y verificar la dependencia de la forma de las líneas de campo eléctrico.",
					comoRecolectarDatos: "/public/laboratorios/campoElectrico/guia.pdf",
					guiaDeMontaje: "/public/laboratorios/campoElectrico/guia.pdf",
					guiaPractica: "/public/laboratorios/campoElectrico/guia.pdf",
					imagen: "/public/laboratorios/campoElectrico/imagen.jpg"
				}
			]);
		});
};
