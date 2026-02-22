const {
  fetchArticles,
  fetchArticleById,
  updateArticleVotes,
} = require("../models/articles.model.js");

exports.getAllArticles = () => {
  return fetchArticles();
};

exports.getSingleArticle = (article_id) => {
  return fetchArticleById(article_id);
};

exports.patchArticle = (article_id, inc_votes) => {
  console.log("service");
  return updateArticleVotes(article_id, inc_votes);
};
