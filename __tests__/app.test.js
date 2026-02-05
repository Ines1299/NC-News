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
