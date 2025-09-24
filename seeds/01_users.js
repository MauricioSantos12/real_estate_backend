exports.seed = async function (knex) {
  await knex("users").del();
  await knex("users").insert([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "user",
      is_active: true,
      is_anonymous: false,
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      role: "admin",
      is_active: true,
      is_anonymous: false,
    },
  ]);
};
