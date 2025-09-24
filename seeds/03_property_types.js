exports.seed = async function (knex) {
  await knex("property_types").del();
  await knex("property_types").insert([
    { id: 1, name: "Apartment" },
    { id: 2, name: "House" },
    { id: 3, name: "Building" },
  ]);
};
