// migrations/20250924121000_create_properties_table.js
exports.up = function (knex) {
  return knex.schema.createTable("properties", function (table) {
    table.increments("id").primary();

    table
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");

    // FK to property_types
    table
      .integer("property_type_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("property_types")
      .onDelete("RESTRICT");

    // FK to property_statuses
    table
      .integer("status_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("property_statuses")
      .onDelete("RESTRICT");

    table.string("title", 100).nullable();
    table.text("description").nullable();
    table.string("icon").nullable();
    table.decimal("price", 10, 2).nullable();

    table.string("address", 255).nullable();
    table.string("city", 100).nullable();
    table.string("state", 100).nullable();
    table.string("zip_code", 20).nullable();

    table.integer("bedrooms").unsigned().nullable();
    table.integer("bathrooms").unsigned().nullable();
    table.integer("area_sqft").unsigned().nullable();

    table.boolean("is_active").notNullable().defaultTo(true);

    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("properties");
};
