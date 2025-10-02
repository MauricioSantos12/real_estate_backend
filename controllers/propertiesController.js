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
      const existingProperty = await PropiertiesModel.getPropertyByTitle(
        req.body.title
      );
      if (existingProperty) {
        return res
          .status(400)
          .json({ error: "A property with this title already exists." });
      }
      const parsedData = propertySchema.safeParse(req.body);
      if (!parsedData.success) {
        return res.status(400).json({ errors: parsedData.error });
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

  async updateProperty(req, res) {
    try {
      const propertyId = req.params.id;
      const parsedData = propertySchema.partial().safeParse(req.body);
      if (!parsedData.success) {
        return res.status(400).json({ errors: parsedData.error });
      }
      const updatedProperty = await PropiertiesModel.updateProperty(
        propertyId,
        parsedData.data
      );
      if (!updatedProperty) {
        return res.status(404).json({ error: "Property not found" });
      }
      res.json(updatedProperty);
    } catch (error) {
      console.error("Error updating property:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};

module.exports = PropertiesController;
