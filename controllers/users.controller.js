const { getAllUsers } = require("../services/users.service.js");

exports.getUsers = (request, response, next) => {
  getAllUsers()
    .then((users) => {
      response.status(200).send({ users });
    })
    .catch(next);
};
