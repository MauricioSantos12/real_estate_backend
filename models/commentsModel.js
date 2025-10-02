const pool = require("../db");

const CommentsModel = {
  async getAllComments() {
    const [rows] = await pool.query(`
      SELECT c.*, u.name AS user_name, u.email AS user_email, u.id AS user_id
      FROM comments c
      INNER JOIN users u ON c.user_id = u.id
    `);
    return rows
      .map((row) => ({
        ...row,
        user: {
          name: row.user_name,
          email: row.user_email,
          id: row.user_id,
        },
      }))
      .map(({ user_email, user_name, user_id, ...rest }) => rest);
  },
  async getCommentById(id) {
    const [rows] = await pool.query("SELECT * FROM comments WHERE id = ?", [
      id,
    ]);
    return rows[0]; // Return the first row or undefined if not found
  },
  async createComment(data) {
    const columns = Object.keys(data);
    const values = columns.map((key) => data[key]);
    const [result] = await pool.query(
      `INSERT INTO comments (${columns.join(", ")}) VALUES (${columns
        .map(() => "?")
        .join(", ")})`,
      values
    );
    return { id: result.insertId, ...data };
  },

  async updateComment(id, data) {
    const columns = Object.keys(data);
    const values = columns.map((key) => data[key]);
    const [result] = await pool.query(
      `UPDATE comments SET ${columns
        .map((key) => `${key} = ?`)
        .join(", ")} WHERE id = ?`,
      [...values, id]
    );
    return result.affectedRows > 0 ? { id, ...data } : null;
  },

  async deleteComment(id) {
    const [result] = await pool.query("DELETE FROM comments WHERE id = ?", [
      id,
    ]);
    return result.affectedRows > 0;
  },
};

module.exports = CommentsModel;
