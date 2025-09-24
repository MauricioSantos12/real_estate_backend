const express = require("express");
const router = express.Router();
const PropertiesImagesController = require("../controllers/propertiesImagesController");

router.get("/", PropertiesImagesController.getAllPropertiesImages);
router.post("/", PropertiesImagesController.createPropertyImage);
router.delete("/:id", PropertiesImagesController.deletePropertyImage);
router.patch("/update/:id", PropertiesImagesController.updatePropertyImage);
module.exports = router;
