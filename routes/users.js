const express = require("express");
const router = express.Router();
const UsersController = require("../controllers/userController");

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of all users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: Mauricio
 *                   email:
 *                     type: string
 *                     example: mauricio@example.com
 */
router.get("/", UsersController.getAllUsers);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a single user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: Mauricio
 *                 email:
 *                   type: string
 *                   example: mauricio@example.com
 *       404:
 *         description: User not found
 */
router.get("/:id", UsersController.getUser);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - is_anonymous
 *               - is_active
 *               - role
 *             properties:
 *               name:
 *                 type: string
 *                 example: Mauricio
 *               email:
 *                 type: string
 *                 example: mauricio@example.com
 *               is_anonymous:
 *                 type: boolean
 *                 example: false
 *               is_active:
 *                 type: boolean
 *                 example: true
 *               role:
 *                 type: string
 *                 example: customer
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Invalid request
 */
router.post("/", UsersController.createUser);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update a user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Updated
 *               email:
 *                 type: string
 *                 example: updated@example.com
 *               is_anonymous:
 *                 type: boolean
 *                 example: false
 *               is_active:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: User updated successfully
 *       404:
 *         description: User not found
 */
router.put("/:id", UsersController.updateUser);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */
router.delete("/:id", UsersController.deleteUser);

module.exports = router;
