const UsersModel = require("../models/usersModel");
const {
  idSchema,
  userSchema,
  userUpdateSchema,
} = require("../schemas/usersSchema");

const UsersController = {
  // Get all users
  async getAllUsers(req, res) {
    try {
      const users = await UsersModel.getAllUsers();
      res.json(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  // Get a user by ID
  async getUser(req, res) {
    try {
      const parsedId = idSchema.safeParse(req.params.id);
      if (!parsedId.success) {
        return res.status(400).json({ errors: parsedId.error.errors });
      }
      const user = await UsersModel.getUserById(parsedId.data);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  // Create a new user
  async createUser(req, res) {
    try {
      const parsedData = userSchema.safeParse(req.body);
      if (!parsedData.success) {
        return res.status(400).json({ errors: parsedData.error });
      }
      const newUser = await UsersModel.createUser(parsedData.data);
      res.status(201).json(newUser);
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  // Update a user
  async updateUser(req, res) {
    try {
      const parsedId = idSchema.safeParse(req.params.id);
      if (!parsedId.success) {
        return res.status(400).json({ errors: parsedId.error.errors });
      }
      const parsedData = userUpdateSchema.safeParse(req.body);
      if (!parsedData.success) {
        return res.status(400).json({ errors: parsedData.error.errors });
      }
      const updatedUser = await UsersModel.updateUser(
        parsedId.data,
        parsedData.data
      );
      if (!updatedUser) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json(updatedUser);
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  // Delete a user
  async deleteUser(req, res) {
    try {
      const parsedId = idSchema.safeParse(req.params.id);
      if (!parsedId.success) {
        return res.status(400).json({ errors: parsedId.error.errors });
      }
      const deleted = await UsersModel.deleteUser(parsedId.data);
      if (!deleted) {
        return res.status(404).json({ error: "User not found" });
      }
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};

module.exports = UsersController;
