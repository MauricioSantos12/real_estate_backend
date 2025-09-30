const { z } = require("zod");

const propertiesTypesSchema = z.object({
  name: z.string().min(3).max(50),
});

module.exports = { propertiesTypesSchema };
