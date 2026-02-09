const { fetchCommentsByArticleId } = require("../models/comments.model.js");

exports.getAllCommentsByArticleId = (article_id) => {
  return fetchCommentsByArticleId(article_id);
};
