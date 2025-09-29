const pool = require("../db");

const PropertiesImagesModel = {
  // Get all properties images
  async getAllPropertiesImages() {
    const [rows] = await pool.query("SELECT * FROM property_images");
    return rows;
  },

  async getPropertyImageByImage(image_url) {
    const [rows] = await pool.query(
      "SELECT * FROM property_images WHERE image_url = ?",
      [image_url]
    );
    return rows[0]; // Return the first row or undefined if not found
  },

  // Create a new property image
  async createPropertyImage({ property_id, image_url, caption, is_primary }) {
    const [result] = await pool.query(
      "INSERT INTO property_images (property_id, image_url, caption, is_primary) VALUES (?, ?, ?, ?)",
      [property_id, image_url, caption, is_primary]
    );
    return { id: result.insertId, property_id, image_url, caption, is_primary };
  },

  // Delete a property image
  async deletePropertyImage(id) {
    const [result] = await pool.query(
      "DELETE FROM property_images WHERE id = ?",
      [id]
    );
    return result.affectedRows > 0;
  },

  // Update a property image
  async updatePropertyImage(id, updates) {
    const setClause = Object.entries(updates)
      .map(([key, value]) => `${key} = COALESCE(?, ${key})`)
      .join(", ");
    const [result] = await pool.query(
      `UPDATE property_images SET ${setClause} WHERE id = ?`,
      [...Object.values(updates), id]
    );
    return result.affectedRows > 0 ? { id, ...updates } : null;
  },
};

module.exports = PropertiesImagesModel;
