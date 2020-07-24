const bcrypt = require("bcryptjs");

exports.seed = function (knex) {
  const users = [
    {
      username: "Adam",
      password: bcrypt.hashSync("secretsDontMakeFriends", 10),
    },
    {
      username: "Drew",
      password: bcrypt.hashSync("secretsDontMakeFriends", 10),
    },
    {
      username: "Eric",
      password: bcrypt.hashSync("secretsDontMakeFriends", 10),
    },
    {
      username: "lambda",
      password: bcrypt.hashSync("secretsDontMakeFriends", 10),
    },
    {
      username: "admin",
      password: bcrypt.hashSync("secretsDontMakeFriends", 10),
    },
  ];

  return knex("users").insert(users);
};
