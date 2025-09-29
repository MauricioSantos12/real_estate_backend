const express = require("express");
const PropertiesStatusController = require("../controllers/propertiesStatusController");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: PropertiesStatus
 *   description: API for managing property statuses
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     PropertyStatus:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         id:
 *           type: integer
 *           description: Auto-generated ID of the property status
 *         name:
 *           type: string
 *           description: Name of the property status (e.g. for_sale, for_rent, sold, rented)
 *           minLength: 3
 *           maxLength: 50
 *       example:
 *         id: 1
 *         name: for_sale
 */

/**
 * @swagger
 * /properties/status:
 *   get:
 *     summary: Get all property statuses
 *     tags: [PropertiesStatus]
 *     responses:
 *       200:
 *         description: List of all property statuses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PropertyStatus'
 */
router.get("/", PropertiesStatusController.getAllData);

/**
 * @swagger
 * /properties/status/{id}:
 *   put:
 *     summary: Update a property status
 *     tags: [PropertiesStatus]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Property status ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PropertyStatus'
 *     responses:
 *       200:
 *         description: Property status updated successfully
 *       404:
 *         description: Property status not found
 */
router.put("/:id", PropertiesStatusController.update);

module.exports = router;
