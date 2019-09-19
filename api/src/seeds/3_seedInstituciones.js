exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("instituciones")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("instituciones").insert([
        {
          id: 1,
          nombre: "Universidad Libre"
        }
      ]);
    });
};
