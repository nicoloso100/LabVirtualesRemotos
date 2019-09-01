exports.up = function(knex, Promise) {
  return knex.schema.createTable("users", t => {
    t.string("email")
      .notNull()
      .primary();
    t.string("name").notNull();
    t.string("surname").notNull();
    t.string("password_digest").notNull();
    t.bigInteger("rol")
      .notNull()
      .references("id")
      .inTable("roles");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("users");
};
