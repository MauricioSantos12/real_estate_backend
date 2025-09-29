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
  async createUser({ name, email, is_anonymous }) {
    const [result] = await pool.query(
      "INSERT INTO users (name, email, is_anonymous) VALUES (?, ?, ?)",
      [name, email, is_anonymous !== undefined ? is_anonymous : 1]
    );
    return { id: result.insertId, name, email, is_anonymous };
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
    const [result] = await pool.query(
      "UPDATE users SET is_active = 0 WHERE id = ?",
      [id]
    );
    return result.affectedRows > 0;
  },
};

module.exports = UsersModel;
