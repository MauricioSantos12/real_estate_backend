const jwt = require("jsonwebtoken");
const UsersModel = require("../models/usersModel");
const {
  idSchema,
  userSchema,
  userUpdateSchema,
} = require("../schemas/usersSchema");
const bcrypt = require("bcrypt");

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
        return res.status(400).json({ errors: parsedId.error });
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
      const existingUser = await UsersModel.getUserByEmail(
        parsedData.data.email
      );
      if (existingUser) {
        return res.status(409).json({ error: "Email already in use" });
      }
      if (parsedData.data.password) {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(
          parsedData.data.password,
          saltRounds
        );
        parsedData.data.password = hashedPassword;
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
        return res.status(400).json({ errors: parsedId.error });
      }
      const parsedData = userUpdateSchema.safeParse(req.body);
      if (!parsedData.success) {
        return res.status(400).json({ errors: parsedData.error });
      }
      const existingUser = await UsersModel.getUserById(parsedId.data);
      if (!existingUser) {
        return res.status(409).json({ error: "User not found" });
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
        return res.status(400).json({ errors: parsedId.error });
      }
      const existingUser = await UsersModel.getUserById(parsedId.data);
      if (!existingUser) {
        return res.status(409).json({ error: "User not found" });
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

  // Login user
  async loginUser(req, res) {
    try {
      const { email, password } = req.body;
      if (!email) {
        return res.status(400).json({ error: "Email is required" });
      }
      if (!password) {
        return res.status(400).json({ error: "Password is required" });
      }

      const user = await UsersModel.getUserByEmail(email);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: "Invalid password" });
      }
      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      res.json({
        message: "Login successful",
        token,
        user: { id: user.id, email: user.email, role: user.role },
      });
    } catch (error) {
      console.error("Error logging in user:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};

module.exports = UsersController;
