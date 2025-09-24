const express = require("express");
const router = express.Router();
const PropertiesController = require("../controllers/propertiesController");

// GET /api/properties - Get all properties
router.get("/", PropertiesController.getAllProperties);
// POST /api/properties - Create a new property
router.post("/", PropertiesController.createProperty);

module.exports = router;
