const objectLookup = require("../db/seeds/object-lookup-function.js");

describe("objectLookup", () => {
  test("Returns an empty object when passed an empty array", () => {
    const example = objectLookup([], "", "");
    const result = {};
    expect(example).toEqual(result);
  });
  test("Returns an object with a single keyvalue pair when passed an array with one object", () => {
    const example = objectLookup(
      [
        {
          article_id: 9,
          title: "They're not exactly dogs, are they?",
        },
      ],
      "title",
      "article_id",
    );
    const result = { "They're not exactly dogs, are they?": 9 };
    expect(example).toEqual(result);
  });
  test("Returns an object with a multiple keyvalue pair when passed an array multiple object", () => {
    const example = objectLookup(
      [
        {
          article_id: 9,
          title: "They're not exactly dogs, are they?",
        },
        {
          article_id: 12,
          title: "Moustache",
        },
      ],
      "title",
      "article_id",
    );
    const result = { "They're not exactly dogs, are they?": 9, Moustache: 12 };

    expect(example).toEqual(result);
  });
  test("Function should not mutate passed array", () => {
    const rows = [
      {
        article_id: 9,
        title: "They're not exactly dogs, are they?",
      },
    ];
    const rowsCopy = rows;
    objectLookup(rows, "article_id", "title");

    expect(rows).toBe(rowsCopy);
  });
});
