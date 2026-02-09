const express = require("express");
const router = express.Router({ mergeParams: true });

const {
  getCommentsByArticleId,
  postCommentsByArticleId,
} = require("../controllers/comments.controller.js");

router.get("/", getCommentsByArticleId);
router.post("/", postCommentsByArticleId);

module.exports = router;
