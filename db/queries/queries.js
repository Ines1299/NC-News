const db = require("../connection.js");

// Get all of the users
// db.query("SELECT * FROM users").then((query) => {
//   console.log(query.rows);
// });

// Get all of the articles where the topic is coding
// db.query("SELECT * FROM articles WHERE topic = 'coding'")
//   .then((query) => {
//     console.log(query.rows);
//   })
//   .catch((err) => {
//     console.log(err);
//   })
//   .then(() => {
//     db.end();
//   });

// Get all of the comments where the votes are less than zero

// db.query("SELECT * FROM comments WHERE votes < 0")
//   .then((query) => {
//     console.log(query.rows);
//   })
//   .then(() => {
//     db.end();
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// Get all of the topics

// db.query("SELECT * FROM topics")
//   .then((query) => {
//     console.log(query.rows);
//   })
//   .then(() => {
//     db.end();
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// Get all of the articles by user grumpy19
