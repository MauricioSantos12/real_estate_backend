exports.up = function (knex) {
  return knex.schema.hasTable("property_images").then(function (exists) {
    if (!exists) {
      return knex.schema.createTable("property_images", function (table) {
        table.increments("id").primary();
        table
          .integer("property_id")
          .unsigned()
          .notNullable()
          .references("id")
          .inTable("properties")
          .onDelete("CASCADE"); // deletes images if property is deleted
        table.string("image_url", 255).notNullable();
        table.string("caption", 255);
        table.boolean("is_primary").notNullable().defaultTo(false);
        table.timestamp("created_at").defaultTo(knex.fn.now());
      });
    }
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("property_images");
};
