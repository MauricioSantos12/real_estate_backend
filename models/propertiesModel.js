const pool = require("../db");

const PropertiesModel = {
  // Get all properties
  async getAllProperties() {
    const [rows] = await pool.query(`
            SELECT p.*, ps.name as status_name, u.name as user_name, pt.name as property_type_name 
            FROM properties p
            LEFT JOIN property_statuses ps ON p.status_id = ps.id
            LEFT JOIN users u ON p.user_id = u.id
            LEFT JOIN property_types pt ON p.property_type_id = pt.id
        `);
    return rows
      .map((row) => ({
        ...row,
        status: { id: row.status_id, name: row.status_name },
        user: { id: row.user_id, name: row.user_name },
        property_type: {
          id: row.property_type_id,
          name: row.property_type_name,
        },
      }))
      .map(({ status_name, user_name, property_type_name, ...rest }) => rest);
  },
  async getPropertyByTitle(title) {
    const [rows] = await pool.query(
      `
            SELECT * 
            FROM properties
            WHERE title = ?
        `,
      [title]
    );
    return rows[0];
  },

  // Create a new property
  async createProperty(data) {
    const fields = Object.keys(data);
    const values = fields.map((key) => data[key]);
    try {
      const query = `INSERT INTO properties (${fields.join(
        ", "
      )}) VALUES (${fields.map(() => "?").join(", ")})`;
      const [result] = await pool.query(query, values);
      return result.affectedRows > 0 ? { id: result.insertId, ...data } : null;
    } catch (error) {
      console.error("Error creating property:", error);
      throw error;
    }
  },

  async updateProperty(propertyId, updateData) {
    try {
      const fields = [];
      const values = [];
      for (const [key, value] of Object.entries(updateData)) {
        fields.push(`${key} = ?`);
        values.push(value);
      }
      const [result] = await pool.query(
        `UPDATE properties SET ${fields.join(", ")} WHERE id = ?`,
        [...values, propertyId]
      );
      return result.affectedRows > 0 ? { id: propertyId, ...updateData } : null;
    } catch (error) {
      console.error("Error updating property:", error);
      return null;
    }
  },
};

module.exports = PropertiesModel;
