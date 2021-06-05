const bcrypt = require("bcryptjs");

const users = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: bcrypt.hashSync("12345678", 10),
    isAdmin: true,
  },
  {
    name: "Abraham Nkomo",
    email: "abraham.nkomo@example.com",
    password: bcrypt.hashSync("12345678", 10),
  },
  {
    name: "Khuluza Nkomo",
    email: "khuluza.nkomo@example.com",
    password: bcrypt.hashSync("12345678", 10),
  },
];
module.exports = users;
