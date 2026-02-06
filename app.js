const express = require("express");
const app = express();

const topicRouter = require("./routes/topics.routes.js");
const articleRouter = require("./routes/articles.routes.js");
const usersRouter = require("./routes/users.routes.js");

app.use(express.json());

app.use("/api/topics", topicRouter);

app.use("/api/articles", articleRouter);

app.use("/api/users", usersRouter);

module.exports = app;
