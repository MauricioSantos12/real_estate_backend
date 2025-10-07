const pool = require("../db");

const UsersModel = {
  // Get all users
  async getAllUsers() {
    const [rows] = await pool.query(
      "SELECT id, name, email, is_anonymous, is_active, role FROM users"
    );

    return rows.map((row) => ({
      id: row.id,
      name: row.name,
      email: row.email,
      is_anonymous: row.is_anonymous,
      is_active: row.is_active,
      role: row.role,
    }));
  },

  // Get a user by ID
  async getUserById(id) {
    const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
    return rows[0]; // Return the first row or undefined if not found
  },

  async getUserByEmail(email) {
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    return rows[0]; // Return the first row or undefined if not found
  },

  async getUserById(id) {
    const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
    return rows[0]; // Return the first row or undefined if not found
  },

  // Create a new user
  async createUser(data) {
    const fields = Object.keys(data);
    const values = fields.map((key) => data[key]);
    const query = `INSERT INTO users (${fields.join(", ")}) VALUES (${fields
      .map(() => "?")
      .join(", ")})`;
    const [result] = await pool.query(query, values);
    return { id: result.insertId, ...data };
  },
  // Update a user
  async updateUser(id, updates) {
    const setClause = Object.entries(updates)
      .map(([key, value]) => `${key} = COALESCE(?, ${key})`)
      .join(", ");
    const [result] = await pool.query(
      `UPDATE users SET ${setClause} WHERE id = ?`,
      [...Object.values(updates), id]
    );
    return result.affectedRows > 0 ? { id, ...updates } : null;
  },

  // Delete a user
  async deleteUser(id) {
    const [result] = await pool.query("DELETE FROM users WHERE id = ?", [id]);
    return result.affectedRows > 0;
  },
};

module.exports = UsersModel;
