class NotFoundError extends Error {
  constructor(message = "Article not found.") {
    super(message);
    this.name = "NotFoundError";
    this.status = 404;
    this.message = message;
  }
}

module.exports = NotFoundError;
