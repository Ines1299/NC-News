const {
  fetchArticles,
  fetchArticleById,
  updateArticleVotes,
} = require("../models/articles.model.js");

exports.getAllArticles = (sort_by, order, topic, search) => {
  return fetchArticles(sort_by, order, topic, search);
};

exports.getSingleArticle = (article_id) => {
  return fetchArticleById(article_id);
};

exports.patchArticle = (article_id, inc_votes) => {
  return updateArticleVotes(article_id, inc_votes);
};
