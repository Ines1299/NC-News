const {
  getAllArticles,
  getSingleArticle,
  patchArticle,
} = require("../services/articles.service.js");

exports.getArticles = (request, response, next) => {
  const { sort_by, order, topic } = request.query;
  getAllArticles(sort_by, order, topic)
    .then((articles) => {
      response.status(200).send({ articles });
    })
    .catch(next);
};

exports.getArticleById = (request, response, next) => {
  const { article_id } = request.params;
  getSingleArticle(article_id)
    .then((article) => {
      response.status(200).send({ article });
    })
    .catch((err) => {
      next(err);
    });
};

exports.patchArticleById = (request, response, next) => {
  const { article_id } = request.params;
  const { inc_votes } = request.body;
  if (typeof inc_votes !== "number") {
    return response.status(400).send({ message: "Bad Request" });
  }
  patchArticle(article_id, inc_votes)
    .then((article) => {
      response.status(200).send(article);
      console.log("controller");
    })
    .catch(next);
};
