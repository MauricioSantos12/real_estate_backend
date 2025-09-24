const PropiertiesImagesModel = require("../models/propertiesImagesModel");
const { propertyImageSchema } = require("../schemas/propertiesImagesSchema");
const { idSchema } = require("../schemas/usersSchema");

const PropertiesController = {
  async getAllPropertiesImages(req, res) {
    try {
      const properties = await PropiertiesImagesModel.getAllPropertiesImages();
      res.json(properties);
    } catch (error) {
      console.error("Error fetching properties:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async createPropertyImage(req, res) {
    try {
      const parsedData = propertyImageSchema.safeParse(req.body);
      if (!parsedData.success) {
        return res.status(400).json({ errors: parsedData.error.errors });
      }
      const newProperty = await PropiertiesImagesModel.createPropertyImage(
        parsedData.data
      );
      res.status(201).json(newProperty);
    } catch (error) {
      console.error("Error creating property:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async deletePropertyImage(req, res) {
    try {
      const parsedId = idSchema.safeParse(req.params.id);
      if (!parsedId.success) {
        return res.status(400).json({ errors: parsedId.error.errors });
      }
      const deleted = await PropiertiesImagesModel.deletePropertyImage(
        parsedId.data
      );
      if (!deleted) {
        return res.status(404).json({ error: "Property not found" });
      }
      res.status(204).send(); // No content for successful deletion
    } catch (error) {
      console.error("Error deleting property:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async updatePropertyImage(req, res) {
    try {
      const parsedId = idSchema.safeParse(req.params.id);
      if (!parsedId.success) {
        return res.status(400).json({ errors: parsedId.error.errors });
      }
      const parsedData = propertyImageSchema.safeParse(req.body);
      if (!parsedData.success) {
        return res.status(400).json({ errors: parsedData.error.errors });
      }
      const updatedProperty = await PropiertiesImagesModel.updatePropertyImage(
        parsedId.data,
        parsedData.data
      );
      if (!updatedProperty) {
        return res.status(404).json({ error: "Property image not found" });
      }
      res.json(updatedProperty);
    } catch (error) {
      console.error("Error updating property:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};

module.exports = PropertiesController;
