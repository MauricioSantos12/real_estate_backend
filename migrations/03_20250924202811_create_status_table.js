// migrations/20250924131000_create_property_statuses_table.js
exports.up = function (knex) {
  return knex.schema.createTable("property_statuses", function (table) {
    table.increments("id").primary();
    table.string("name", 50).notNullable().unique(); // For_sale, For_rent, Sold, Rented
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("property_statuses");
};
