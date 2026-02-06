const {
  fetchArticles,
  fetchArticleById,
} = require("../models/articles.model.js");

exports.getAllArticles = () => {
  return fetchArticles();
};

exports.getSingleArticle = (article_id) => {
  return fetchArticleById(article_id);
};
