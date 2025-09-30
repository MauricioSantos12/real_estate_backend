const express = require("express");
const PropertiesTypesController = require("../controllers/propertiesTypesController");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: PropertiesTypes
 *   description: API for managing property types
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     PropertyTypes:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         id:
 *           type: integer
 *           description: Auto-generated ID of the property types
 *         name:
 *           type: string
 *           description: Name of the property types (e.g. Aparment, House, Building)
 *           minLength: 3
 *           maxLength: 50
 *       example:
 *         id: 1
 *         name: Aparment
 */

/**
 * @swagger
 * /properties/types:
 *   get:
 *     summary: Get all property types
 *     tags: [PropertiesTypes]
 *     responses:
 *       200:
 *         description: List of all property types
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PropertyTypes'
 */
router.get("/", PropertiesTypesController.getAllData);

/**
 * @swagger
 * /properties/types/{id}:
 *   put:
 *     summary: Update a property types
 *     tags: [PropertiesTypes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Property types ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PropertyTypes'
 *     responses:
 *       200:
 *         description: Property types updated successfully
 *       404:
 *         description: Property types not found
 */
router.put("/:id", PropertiesTypesController.update);

module.exports = router;
