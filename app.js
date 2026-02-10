const express = require("express");
const app = express();

const topicRouter = require("./routes/topics.routes.js");
const articleRouter = require("./routes/articles.routes.js");
const usersRouter = require("./routes/users.routes.js");
const commentsRouter = require("./routes/comments.routes.js");
const NotFoundError = require("./errors/not-found-error.js");

app.use(express.json());

const path = require("path");
app.use("/static", express.static(path.join(__dirname, "public")));

app.use("/api/topics", topicRouter);

app.use("/api/articles", articleRouter);

app.use("/api/users", usersRouter);

app.use("/api/articles/:article_id/comments", commentsRouter);

app.use((err, req, res, next) => {
  if (err instanceof NotFoundError) {
    res.status(err.status).send({ message: err.message, status: err.status });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ message: "Bad Request" });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ message: "Internal Server Error" });
});

module.exports = app;
