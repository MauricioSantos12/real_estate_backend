const pool = require("../db");

const PropertiesStatusModel = {
  async getAllData() {
    const [rows] = await pool.query("SELECT * FROM property_statuses");
    return rows;
  },

  async update(id, data) {
    const columns = Object.keys(data);
    const values = columns.map((key) => data[key]);
    const [result] = await pool.query(
      `UPDATE property_statuses SET ${columns
        .map((key) => `${key} = ?`)
        .join(", ")} WHERE id = ?`,
      [...values, id]
    );
    return result.affectedRows > 0 ? { id, ...data } : null;
  },
};

module.exports = PropertiesStatusModel;
