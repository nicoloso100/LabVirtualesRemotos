exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("roles")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("roles").insert([
        { id: 1, descripcion: "visitante" },
        { id: 2, descripcion: "estudiante" },
        { id: 3, descripcion: "profesor" },
        { id: 4, descripcion: "administrador" }
      ]);
    });
};
