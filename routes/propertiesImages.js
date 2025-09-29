const express = require("express");
const router = express.Router();
const PropertiesImagesController = require("../controllers/propertiesImagesController");

/**
 * @swagger
 * tags:
 *   name: Property Images
 *   description: API for managing property images
 */

/**
 * @swagger
 * /properties/images:
 *   get:
 *     summary: Get all property images
 *     tags: [Property Images]
 *     responses:
 *       200:
 *         description: List of property images
 */
router.get("/", PropertiesImagesController.getAllPropertiesImages);

/**
 * @swagger
 * /properties/images:
 *   post:
 *     summary: Create a new property image
 *     tags: [Property Images]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               property_id:
 *                 type: numeric
 *                 example: 1
 *               image_url:
 *                 type: string
 *                 format: uri
 *                 example: "https://example.com/image.jpg"
 *               caption:
 *                 type: string
 *                 example: "Living room photo"
 *               is_primary:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       201:
 *         description: Property image created successfully
 */
router.post("/", PropertiesImagesController.createPropertyImage);

/**
 * @swagger
 * /properties/images/{id}:
 *   delete:
 *     summary: Delete a property image by ID
 *     tags: [Property Images]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *         description: Property image ID
 *     responses:
 *       200:
 *         description: Property image deleted successfully
 *       404:
 *         description: Property image not found
 */
router.delete("/:id", PropertiesImagesController.deletePropertyImage);

/**
 * @swagger
 * /properties/images/update/{id}:
 *   patch:
 *     summary: Update a property image by ID
 *     tags: [Property Images]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *         description: Property image ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               property_id:
 *                 type: numeric
 *                 example: 1
 *               caption:
 *                 type: string
 *                 example: "Updated living room photo"
 *               is_primary:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Property image updated successfully
 */
router.patch("/update/:id", PropertiesImagesController.updatePropertyImage);

module.exports = router;
