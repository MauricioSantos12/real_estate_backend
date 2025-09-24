const express = require("express");
const router = express.Router();
const UsersController = require("../controllers/userController");

// Define routes (will be prefixed with /api in index.js)
router.get("/", UsersController.getAllUsers);
router.get("/:id", UsersController.getUser);
router.post("/", UsersController.createUser);
router.put("/:id", UsersController.updateUser);
router.delete("/:id", UsersController.deleteUser);

module.exports = router;
