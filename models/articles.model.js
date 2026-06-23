const db = require("../db/connection.js");
const NotFoundError = require("../errors/not-found-error.js");
const BadRequestError = require("../errors/bad-request-error");

exports.fetchArticles = async (
  sort_by = "created_at",
  order = "DESC",
  topic = "",
  search = "",
  author = "",
) => {
  const sorts = [
    "author",
    "title",
    "article_id",
    "topic",
    "created_at",
    "votes",
    "article_img_url",
  ];
  const orders = ["DESC", "ASC"];

  const topics = ["football", "coding", "cooking"];

  if (!sorts.includes(sort_by)) {
    throw new BadRequestError("Invalid sort query");
  }

  order = order.toUpperCase();

  if (!orders.includes(order)) {
    throw new BadRequestError("Invalid order query");
  }

  if (topic && !topics.includes(topic)) {
    throw new BadRequestError("Invalid topic");
  }

  let value = [];

  let queryStr = `SELECT 
      articles.author, 
      articles.title,
      articles.article_id,
      articles.topic,
      articles.created_at,
      articles.votes,
      articles.article_img_url,
      CAST(COUNT(comments.comment_id) AS INT) AS comment_count FROM articles LEFT JOIN comments 
      ON articles.article_id = comments.article_id`;

  const whereClauses = [];

  if (topic) {
    value.push(topic);
    whereClauses.push(`articles.topic = $${value.length}`);
  }

  if (search) {
    value.push(`%${search}%`);
    const i = value.length;
    whereClauses.push(
      `(articles.title ILIKE $${i} OR articles.author ILIKE $${i} OR articles.topic ILIKE $${i})`,
    );
  }

  if (author) {
    value.push(author);
    whereClauses.push(`articles.author= $${value.length}`);
  }

  if (whereClauses.length > 0) {
    queryStr += ` WHERE ` + whereClauses.join(" AND ");
  }

  queryStr += `
      GROUP BY articles.article_id
      ORDER BY ${sort_by} ${order}`;
  return db.query(queryStr, value).then(({ rows }) => {
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
        return rows[0];
      }
    });
};
