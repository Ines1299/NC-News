const express = require("express");
const router = express.Router();

const {
  getArticles,
  getArticleById,
  patchArticleById,
} = require("../controllers/articles.controller.js");

router.get("/", getArticles);
router.get("/:article_id", getArticleById);
router.patch("/:article_id", patchArticleById);

module.exports = router;
