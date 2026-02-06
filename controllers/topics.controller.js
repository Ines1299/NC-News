const { getAllTopics } = require("../services/topics.service.js");

exports.getTopics = (request, response, next) => {
  getAllTopics()
    .then((topics) => {
      response.status(200).send({ topics });
    })
    .catch(next);
};
