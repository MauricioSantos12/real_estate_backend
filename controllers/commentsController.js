const CommentsModel = require("../models/commentsModel");
const { commentSchema } = require("../schemas/commentsSchema");
const { idSchema } = require("../schemas/usersSchema");

const CommentsController = {
  // Get all comments
  async getAllComments(req, res) {
    try {
      const comments = await CommentsModel.getAllComments();
      res.json(comments);
    } catch (error) {
      console.error("Error fetching comments:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  // Create a new comment
  async createComment(req, res) {
    try {
      const parsedData = commentSchema.safeParse(req.body);
      if (!parsedData.success) {
        return res.status(400).json({ errors: parsedData.error });
      }
      const newComment = await CommentsModel.createComment(parsedData.data);
      res.status(201).json(newComment);
    } catch (error) {
      console.error("Error creating comment:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  // Get a comment by ID
  async getComment(req, res) {
    try {
      const parsedId = idSchema.safeParse(req.params.id);
      if (!parsedId.success) {
        return res.status(400).json({ errors: parsedId.error });
      }
      const comment = await CommentsModel.getCommentById(parsedId.data);
      if (!comment) {
        return res.status(404).json({ error: "Comment not found" });
      }
      res.json(comment);
    } catch (error) {
      console.error("Error fetching comment:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async updateComment(req, res) {
    try {
      const parsedId = idSchema.safeParse(req.params.id);
      if (!parsedId.success) {
        return res.status(400).json({ errors: parsedId.error });
      }
      const parsedData = commentSchema.safeParse(req.body);
      if (!parsedData.success) {
        return res.status(400).json({ errors: parsedData.error });
      }
      const updatedComment = await CommentsModel.updateComment(
        parsedId.data,
        parsedData.data
      );
      if (!updatedComment) {
        return res.status(404).json({ error: "Comment not found" });
      }
      res.json(updatedComment);
    } catch (error) {
      console.error("Error updating comment:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async deleteComment(req, res) {
    try {
      const parsedId = idSchema.safeParse(req.params.id);
      if (!parsedId.success) {
        return res.status(400).json({ errors: parsedId.error });
      }
      const deleted = await CommentsModel.deleteComment(parsedId.data);
      if (!deleted) {
        return res.status(404).json({ error: "Comment not found" });
      }
      res.status(200).json({ message: "Comment deleted successfully" });
    } catch (error) {
      console.error("Error deleting comment:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};

module.exports = CommentsController;
