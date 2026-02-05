const db = require("../db/connection.js");

exports.fetchTopics = () => {
  return db
    .query("SELECT slug, description FROM topics;")
    .then(({ rows }) => rows);
};
