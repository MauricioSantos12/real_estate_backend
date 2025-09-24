const express = require("express");
const router = express.Router();
const CommentsController = require("../controllers/commentsController");

router.get("/", CommentsController.getAllComments);
router.post("/", CommentsController.createComment);
router.get("/:id", CommentsController.getComment);
router.put("/:id", CommentsController.updateComment);
router.delete("/:id", CommentsController.deleteComment);

module.exports = router;
