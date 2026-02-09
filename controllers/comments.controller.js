const {
  getAllCommentsByArticleId,
  postAllCommentsByArticleId,
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

exports.postCommentsByArticleId = (request, response, next) => {
  const { article_id } = request.params;
  const { username, body: commentBody } = request.body;
  if (
    !username ||
    typeof username !== "string" ||
    !commentBody ||
    typeof commentBody !== "string"
  ) {
    return response
      .status(400)
      .send({ message: "Bad Request: username and body needed" });
  }

  postAllCommentsByArticleId(article_id, username, commentBody)
    .then((comment) => {
      response.status(201).send({ comment });
    })
    .catch(next);
};
