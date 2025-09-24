const pool = require("../db");

const CommentsModel = {
  async getAllComments() {
    const [rows] = await pool.query("SELECT * FROM comments");
    return rows;
  },
  async getCommentById(id) {
    const [rows] = await pool.query("SELECT * FROM comments WHERE id = ?", [
      id,
    ]);
    return rows[0]; // Return the first row or undefined if not found
  },
  async createComment({ user_id, property_id, comment }) {
    const [result] = await pool.query(
      "INSERT INTO comments (user_id, property_id, comment) VALUES (?, ?, ?)",
      [user_id, property_id, comment]
    );
    return { id: result.insertId, user_id, property_id, comment };
  },
  async updateComment(id, { user_id, property_id, comment }) {
    const [result] = await pool.query(
      "UPDATE comments SET user_id = ?, property_id = ?, comment = ? WHERE id = ?",
      [user_id, property_id, comment, id]
    );
    return result.affectedRows > 0
      ? { id, user_id, property_id, comment }
      : null;
  },
  async deleteComment(id) {
    const [result] = await pool.query("DELETE FROM comments WHERE id = ?", [
      id,
    ]);
    return result.affectedRows > 0;
  },
};

module.exports = CommentsModel;
