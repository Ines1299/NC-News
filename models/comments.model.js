const db = require("../db/connection.js");
const NotFoundError = require("../errors/not-found-error.js");

exports.fetchCommentsByArticleId = (article_id) => {
  return db
    .query(
      `SELECT 
      comments.comment_id, 
      comments.votes,
      comments.created_at,
      comments.author,
      comments.body,
      comments.article_id 
      FROM comments WHERE article_id = $1
      ORDER BY created_at DESC
`,
      [article_id],
    )
    .then(({ rows }) => {
      if (rows.length === 0) {
        throw new NotFoundError();
      } else {
        return rows;
      }
    });
};

exports.insertCommentsByArticleId = (article_id, username, body) => {
  return db
    .query(
      `INSERT INTO comments (author, body, article_id) VALUES ($1, $2, $3) RETURNING * `,
      [username, body, article_id],
    )
    .then(({ rows }) => {
      if (rows.length === 0) {
        throw new NotFoundError();
      } else {
        return rows[0];
      }
    });
};

exports.deleteThisCommentByCommentId = (comment_id) => {
  return db
    .query(`DELETE FROM comments WHERE comment_id = $1 RETURNING *`, [
      comment_id,
    ])
    .then(({ rows, rowCount }) => {
      if (rowCount === 0) {
        throw new NotFoundError("Comment not found", 404);
      }
      return rows[0];
    });
};
