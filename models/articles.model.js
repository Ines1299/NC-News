const db = require("../db/connection.js");
const NotFoundError = require("../errors/not-found-error.js");

exports.fetchArticles = () => {
  return db
    .query(
      `SELECT 
      articles.author, 
      articles.title,
      articles.article_id,
      articles.topic,
      articles.created_at,
      articles.votes,
      articles.article_img_url,
      CAST(COUNT(comments.comment_id) AS INT) AS comment_count FROM articles LEFT JOIN comments 
      ON articles.article_id = comments.article_id
      GROUP BY articles.article_id
      ORDER BY created_at DESC
`,
    )
    .then(({ rows }) => {
      return rows;
    });
};

exports.fetchArticleById = (article_id) => {
  return db
    .query(
      `SELECT
    articles.author,
    articles.title,
    articles.body, 
    articles.topic,
    articles.created_at,
    articles.votes,
    articles.article_img_url
    FROM articles
    WHERE articles.article_id = $1`,
      [article_id],
    )
    .then(({ rows }) => {
      if (rows.length === 0) {
        throw new NotFoundError();
      } else {
        return rows[0];
      }
    });
};

exports.updateArticleVotes = (article_id, newVotes) => {
  return db
    .query(
      `UPDATE articles
SET votes = votes + $1
WHERE article_id = $2
RETURNING *;`,
      [newVotes, article_id],
    )
    .then(({ rows }) => {
      if (rows.length === 0) {
        throw new NotFoundError();
      } else {
        console.log("model");
        return rows[0];
      }
    });
};
