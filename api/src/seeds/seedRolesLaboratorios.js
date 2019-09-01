exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("rolesLaboratorios")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("rolesLaboratorios").insert([
        { id: 1, descripcion: "virtual" },
        { id: 2, descripcion: "remoto" }
      ]);
    });
};
