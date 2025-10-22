const bcrypt = require("bcrypt");
const saltRounds = 10;
exports.seed = async function (knex) {
  await knex("users").del();
  await knex("users").insert([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "agent",
      is_active: true,
      is_anonymous: false,
      password: await bcrypt.hash("password", saltRounds),
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      role: "admin",
      is_active: true,
      is_anonymous: false,
      password: await bcrypt.hash("password", saltRounds),
    },
  ]);
};
