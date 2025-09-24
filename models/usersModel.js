const pool = require("../db");

const UsersModel = {
  // Get all users
  async getAllUsers() {
    const [rows] = await pool.query("SELECT * FROM users");
    return rows;
  },

  // Get a user by ID
  async getUserById(id) {
    const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
    return rows[0]; // Return the first row or undefined if not found
  },

  // Create a new user
  async createUser({ name, email, is_anonymous }) {
    const [result] = await pool.query(
      "INSERT INTO users (name, email, is_anonymous) VALUES (?, ?, ?)",
      [name, email, is_anonymous !== undefined ? is_anonymous : 1]
    );
    return { id: result.insertId, name, email, is_anonymous };
  },

  // Update a user
  async updateUser(id, { name, email, is_anonymous }) {
    const [result] = await pool.query(
      `UPDATE users SET 
        name = COALESCE(?, name), 
        email = COALESCE(?, email), 
        is_anonymous = COALESCE(?, is_anonymous), 
        updated_at = CURRENT_TIMESTAMP 
      WHERE id = ?`,
      [name, email, is_anonymous, id]
    );
    return result.affectedRows > 0 ? { id, name, email, is_anonymous } : null;
  },

  // Delete a user
  async deleteUser(id) {
    const [result] = await pool.query("DELETE FROM users WHERE id = ?", [id]);
    return result.affectedRows > 0;
  },
};

module.exports = UsersModel;
