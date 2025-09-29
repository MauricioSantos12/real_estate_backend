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
