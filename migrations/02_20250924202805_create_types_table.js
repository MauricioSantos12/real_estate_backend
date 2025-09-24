// migrations/20250924130000_create_property_types_table.js
exports.up = function (knex) {
  return knex.schema.createTable("property_types", function (table) {
    table.increments("id").primary();
    table.string("name", 50).notNullable().unique(); // Apartment, House, Building
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("property_types");
};
