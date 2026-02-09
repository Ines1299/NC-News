const {
  getAllCommentsByArticleId,
} = require("../services/comments.service.js");

exports.getCommentsByArticleId = (request, response, next) => {
  const { article_id } = request.params;
  getAllCommentsByArticleId(article_id)
    .then((comments) => {
      response.status(200).send({ comments });
    })
    .catch((err) => {
      next(err);
    });
};
