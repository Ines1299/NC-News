const {
  getAllArticles,
  getSingleArticle,
} = require("../services/articles.service.js");

exports.getArticles = (request, response, next) => {
  getAllArticles()
    .then((articles) => {
      response.status(200).send({ articles });
    })
    .catch(next);
};

exports.getArticleById = (request, response, next) => {
  const { article_id } = request.params;
  getSingleArticle(article_id)
    .then((article) => {
      console.log("article from service", article);
      response.status(200).send({ article });
    })
    .catch((err) => {
      next(err);
    });
};
