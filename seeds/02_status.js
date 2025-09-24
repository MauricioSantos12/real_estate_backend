exports.seed = async function (knex) {
  await knex("property_statuses").del();
  await knex("property_statuses").insert([
    { id: 1, name: "For Sale" },
    { id: 2, name: "For Rent" },
    { id: 3, name: "Sold" },
    { id: 4, name: "Rented" },
  ]);
};
