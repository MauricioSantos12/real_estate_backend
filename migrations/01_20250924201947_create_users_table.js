// migrations/20250924120000_create_users_table.js
exports.up = function (knex) {
  return knex.schema.createTable("users", function (table) {
    table.increments("id").primary();
    table.string("name", 100).nullable();
    table.string("email", 100).notNullable().unique();
    table.boolean("is_anonymous").notNullable().defaultTo(false);

    // New columns
    table
      .enum("role", ["admin", "agent", "customer"])
      .notNullable()
      .defaultTo("customer");
    table.boolean("is_active").notNullable().defaultTo(true);

    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
