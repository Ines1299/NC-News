const { fetchTopics } = require("../models/topics.model.js");

exports.getAllTopics = () => {
  return fetchTopics();
};
