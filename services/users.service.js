const { fetchUsers } = require("../models/users.model.js");

exports.getAllUsers = () => {
  return fetchUsers();
};
