const pool = require("../db");

const PropertiesModel = {
  // Get all properties
  async getAllProperties() {
    const [rows] = await pool.query(`
            SELECT p.*, pt.type_name 
            FROM properties p 
            JOIN property_types pt ON p.property_type_id = pt.id
        `);
    return rows;
  },

  // Create a new property
  async createProperty({
    user_id,
    property_type_id,
    title,
    description,
    price,
    address,
    city,
    state,
    zip_code,
    bedrooms,
    bathrooms,
    area_sqft,
    status = "for_sale",
  }) {
    try {
      const [result] = await pool.query(
        `INSERT INTO properties (
            user_id, property_type_id, title, description, price, address, city, state, 
            zip_code, bedrooms, bathrooms, area_sqft, status
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          user_id,
          property_type_id,
          title,
          description,
          price,
          address,
          city,
          state,
          zip_code,
          bedrooms,
          bathrooms,
          area_sqft,
          status,
        ]
      );

      res.status(201).json({ id: result.insertId, ...req.body });
    } catch (error) {
      console.error("Error creating property:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};

module.exports = PropertiesModel;
