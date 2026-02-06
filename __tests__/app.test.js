const request = require("supertest");
const db = require("../db/connection");
const data = require("../db/data/test-data/index");
const app = require("../app.js");
const seed = require("../db/seeds/seed");

beforeEach(() => {
  return seed(data);
});

afterAll(() => {
  return db.end();
});

describe("GET: /api/topics", () => {
  test("200: Responds with an array on the key of topics", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body }) => {
        expect(typeof body.topics).toBe("object");
      });
  });
  test("200: tpoics array contains 3 topics", () => {
    return request(app)
      .get("/api/topics")
      .then(({ body }) => {
        expect(body.topics).toHaveLength(3);
      });
  });
  test("200: Each topic object has props: slug, description", () => {
    return request(app)
      .get("/api/topics")
      .then(({ body: { topics } }) => {
        topics.forEach((topic) => {
          expect(typeof topic.slug).toBe("string");
          expect(typeof topic.description).toBe("string");
        });
      });
  });
});

describe("GET: /api/articles", () => {
  test("200: Responds with an array on the key of articles", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body }) => {
        expect(typeof body.articles).toBe("object");
      });
  });
  test("200: articles array contains 3 article objects", () => {
    return request(app)
      .get("/api/articles")
      .then(({ body }) => {
        expect(body.articles).toHaveLength(13);
      });
  });
  test("200: Each  article object has props: author, title, article_id, topic, created_at, votes, article_img_url, comment_count", () => {
    return request(app)
      .get("/api/articles")
      .then(({ body: { articles } }) => {
        articles.forEach((article) => {
          expect(typeof article.author).toBe("string");
          expect(typeof article.title).toBe("string");
          expect(typeof article.article_id).toBe("number");
          expect(typeof article.created_at).toBe("string");
          expect(typeof article.votes).toBe("number");
          expect(typeof article.article_img_url).toBe("string");
          expect(typeof article.comment_count).toBe("number");
        });
      });
  });
});
describe("GET: /api/users", () => {
  test("200: Responds with an array on the key of users", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({ body }) => {
        expect(typeof body.users).toBe("object");
      });
  });
  test("200: users array contains 4 user objects", () => {
    return request(app)
      .get("/api/users")
      .then(({ body }) => {
        expect(body.users).toHaveLength(4);
      });
  });
  test("200: Each user object has props: username, name, avatar_url", () => {
    return request(app)
      .get("/api/users")
      .then(({ body: { users } }) => {
        users.forEach((user) => {
          expect(typeof user.username).toBe("string");
          expect(typeof user.name).toBe("string");
        });
      });
  });
});
describe("GET: /api/articles/:article_id", () => {
  test("200: Responds with an array on the key of article", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then(({ body }) => {
        expect(typeof body.article).toBe("object");
      });
  });
  test("200: Article object has props: author, title, article_id, topic, created_at, votes, article_img_url, comment_count", () => {
    return request(app)
      .get("/api/articles/1")
      .then(({ body: { article } }) => {
        expect(typeof article.author).toBe("string");
        expect(article.author).toBe("butter_bridge");
        expect(typeof article.title).toBe("string");
        expect(article.title).toBe("Living in the shadow of a great man");
        expect(typeof article.created_at).toBe("string");
        expect(typeof article.votes).toBe("number");
        expect(article.votes).toBe(100);
        expect(typeof article.article_img_url).toBe("string");
        expect(typeof article.article_img_url).toBe("string");
        expect(article.article_img_url).toBe(
          "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
        );
        expect(typeof article.topic).toBe("string");
        expect(article.topic).toBe("mitch");
      });
  });
  test("400: responds with bad request when article_id is invalid", () => {
    return request(app)
      .get("/api/articles/bananas")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request");
      });
  });
  test("404: responds with not found when article_id doesn't exist", () => {
    return request(app)
      .get("/api/articles/9999")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Article not found.");
      });
  });
});
