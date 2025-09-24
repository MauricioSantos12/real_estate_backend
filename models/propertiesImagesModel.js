const pool = require("../db");

const PropertiesImagesModel = {
  // Get all properties images
  async getAllPropertiesImages() {
    const [rows] = await pool.query("SELECT * FROM properties_images");
    return rows;
  },

  // Create a new property image
  async createPropertyImage({ property_id, image_url, caption, is_primary }) {
    const [result] = await pool.query(
      "INSERT INTO properties_images (property_id, image_url) VALUES (?, ?)",
      [property_id, image_url]
    );
    return { id: result.insertId, property_id, image_url };
  },

  // Delete a property image
  async deletePropertyImage(id) {
    const [result] = await pool.query(
      "DELETE FROM properties_images WHERE id = ?",
      [id]
    );
    return result.affectedRows > 0;
  },

  // Update a property image
  async updatePropertyImage(id, { image_url, caption, is_primary }) {
    if (!image_url) {
      throw new Error("No data provided to update");
    }
    const [result] = await pool.query(
      "UPDATE properties_images SET image_url = ?, caption = COALESCE(?, caption), is_primary = COALESCE(?, is_primary) WHERE id = ?",
      [image_url, caption, is_primary, id]
    );
    return result.affectedRows > 0
      ? { id, image_url, caption, is_primary }
      : null;
  },
};

module.exports = PropertiesImagesModel;
