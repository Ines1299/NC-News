const {
  fetchCommentsByArticleId,
  insertCommentsByArticleId,
  deleteThisCommentByCommentId,
} = require("../models/comments.model.js");
const { fetchArticleById } = require("../models/articles.model.js");

exports.getAllCommentsByArticleId = (article_id) => {
  return fetchCommentsByArticleId(article_id);
};

exports.postAllCommentsByArticleId = (article_id, username, body) => {
  return fetchArticleById(article_id).then(() => {
    return insertCommentsByArticleId(article_id, username, body);
  });
};

exports.deleteAllCommentsByCommentId = (comment_id) => {
  return deleteThisCommentByCommentId(comment_id);
};
