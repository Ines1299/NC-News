const express = require("express");
const router = express.Router({ mergeParams: true });

const {
  getCommentsByArticleId,
  postCommentsByArticleId,
  deleteCommentsByCommentId,
} = require("../controllers/comments.controller.js");

router.get("/", getCommentsByArticleId);
router.post("/", postCommentsByArticleId);
router.delete("/", deleteCommentsByCommentId);

module.exports = router;
