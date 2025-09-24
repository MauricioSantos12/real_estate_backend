const PropiertiesModel = require("../models/propertiesModel");
const { propertySchema } = require("../schemas/propertiesSchema");

const PropertiesController = {
  // Get all properties
  async getAllProperties(req, res) {
    try {
      const properties = await PropiertiesModel.getAllProperties();
      res.json(properties);
    } catch (error) {
      console.error("Error fetching properties:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
  // Create a new property
  async createProperty(req, res) {
    try {
      const parsedData = propertySchema.safeParse(req.body);
      if (!parsedData.success) {
        return res.status(400).json({ errors: parsedData.error.errors });
      }
      const newProperty = await PropiertiesModel.createProperty(
        parsedData.data
      );
      res.status(201).json(newProperty);
    } catch (error) {
      console.error("Error creating property:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};

module.exports = PropertiesController;
