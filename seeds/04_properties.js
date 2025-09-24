exports.seed = async function (knex) {
  await knex("properties").del();
  await knex("properties").insert([
    {
      id: 1,
      user_id: 1,
      property_type_id: 1, // must exist in property_types
      status_id: 1, // must exist in status
      title: "Cozy Apartment",
      description: "A nice small apartment in the city center.",
      icon: "🏠",
      price: 120000,
      address: "123 Main St",
      city: "New York",
      state: "NY",
      zip_code: "10001",
      bedrooms: 2,
      bathrooms: 1,
      area_sqft: 750,
      is_active: true,
    },
    {
      id: 2,
      user_id: 2,
      property_type_id: 2,
      status_id: 2,
      title: "Family House",
      description: "Spacious house with a garden.",
      icon: "🏡",
      price: 250000,
      address: "456 Elm St",
      city: "Los Angeles",
      state: "CA",
      zip_code: "90001",
      bedrooms: 4,
      bathrooms: 3,
      area_sqft: 2000,
      is_active: false,
    },
  ]);
};
