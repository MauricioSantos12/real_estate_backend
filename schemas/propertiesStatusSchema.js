const { z } = require("zod");

const propertiesStatusSchema = z.object({
  name: z.string().min(3).max(50),
});

module.exports = { propertiesStatusSchema };
