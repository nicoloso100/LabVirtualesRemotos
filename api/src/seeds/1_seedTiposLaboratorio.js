exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("tiposLaboratorio")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("tiposLaboratorio").insert([
        { id: 1, descripcion: "virtual" },
        { id: 2, descripcion: "remoto" }
      ]);
    });
};
