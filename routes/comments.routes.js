const express = require("express");
const router = express.Router({ mergeParams: true });

const {
  getCommentsByArticleId,
} = require("../controllers/comments.controller.js");

router.get("/", getCommentsByArticleId);

module.exports = router;
