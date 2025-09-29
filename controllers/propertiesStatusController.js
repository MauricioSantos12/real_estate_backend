const PropertiesStatusModel = require("../models/propertiesStatusModel");
const { propertiesStatusSchema } = require("../schemas/propertiesStatusSchema");
const { idSchema } = require("../schemas/usersSchema");

const PropertiesStatusController = {
  // Get all comments
  async getAllData(req, res) {
    try {
      const comments = await PropertiesStatusModel.getAllData();
      res.json(comments);
    } catch (error) {
      console.error("Error fetching comments:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async update(req, res) {
    try {
      const parsedId = idSchema.safeParse(req.params.id);
      if (!parsedId.success) {
        return res.status(400).json({ errors: parsedId.error.errors });
      }
      const parsedData = propertiesStatusSchema.safeParse(req.body);
      if (!parsedData.success) {
        return res.status(400).json({ errors: parsedData.error.errors });
      }
      const updatedData = await PropertiesStatusModel.update(
        parsedId.data,
        parsedData.data
      );
      if (!updatedData) {
        return res.status(404).json({ error: "Property Status not found" });
      }
      res.json(updatedData);
    } catch (error) {
      console.error("Error updating comment:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};

module.exports = PropertiesStatusController;
