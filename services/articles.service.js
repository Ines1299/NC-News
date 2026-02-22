const {
  fetchArticles,
  fetchArticleById,
  updateArticleVotes,
} = require("../models/articles.model.js");

exports.getAllArticles = (sort_by, order, topic) => {
  return fetchArticles(sort_by, order, topic);
};

exports.getSingleArticle = (article_id) => {
  return fetchArticleById(article_id);
};

exports.patchArticle = (article_id, inc_votes) => {
  console.log("service");
  return updateArticleVotes(article_id, inc_votes);
};
