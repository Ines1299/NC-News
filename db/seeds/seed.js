const db = require("../connection");
const format = require("pg-format");

const seed = ({ topicData, userData, articleData, commentData }) => {
  return db
    .query(
      `DROP TABLE IF EXISTS comments;
      DROP TABLE IF EXISTS articles;
      DROP TABLE IF EXISTS users;
      DROP TABLE IF EXISTS topics;`,
    )
    .then(() => {
      return db.query(
        `CREATE TABLE topics
       (slug VARCHAR(100) PRIMARY KEY, 
       description VARCHAR(1000),
       img_url VARCHAR(1000))`,
      );
    })
    .then(() => {
      return db.query(
        `CREATE TABLE users(
      username VARCHAR(50) PRIMARY KEY,
      name VARCHAR(50),
      avatar_url VARCHAR(1000));`,
      );
    })
    .then(() => {
      return db.query(
        `CREATE TABLE articles(
      article_id SERIAL PRIMARY KEY,
      title VARCHAR(200),
      topic VARCHAR(200), FOREIGN KEY (topic) REFERENCES topics(slug),
      author VARCHAR(200), FOREIGN KEY (author) REFERENCES users(username),
      body TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      votes INTEGER DEFAULT 0,
      article_img_url VARCHAR(1000));`,
      );
    })
    .then(() => {
      return db.query(
        `CREATE TABLE comments (
        comment_id SERIAL PRIMARY KEY,
        article_id INT NOT NULL, FOREIGN KEY (article_id) REFERENCES articles(article_id),
        body TEXT,
        votes INTEGER DEFAULT 0,
        author VARCHAR(50), FOREIGN KEY (author) REFERENCES users(username),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`,
      );
    })
    .then(() => {
      const formattedTopics = topicData.map((topic) => {
        return [topic.slug, topic.description, topic.img_url];
      });
      const queryStr = format(
        `INSERT INTO topics (slug, description, img_url) VALUES %L`,
        formattedTopics,
      );
      return db.query(queryStr);
    })
    .then(() => {
      const formattedUsers = userData.map((user) => {
        return [user.username, user.name, user.avatar_url];
      });
      const queryStr = format(
        `INSERT INTO users (username, name, avatar_url) VALUES %L`,
        formattedUsers,
      );
      return db.query(queryStr);
    })
    .then(() => {
      const formattedArticles = articleData.map((article) => {
        return [
          article.title,
          article.topic,
          article.author,
          article.body,
          article.created_at,
          article.votes,
          article.article_img_url,
        ];
      });
      const queryStr = format(
        `INSERT INTO articles (title, topic, author, body, created_at, votes, article_img_url) VALUES %L`,
        formattedArticles,
      );
      return db.query(queryStr);
    });
};
module.exports = seed;
