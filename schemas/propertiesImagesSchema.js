const { z } = require("zod");

const propertyImageSchema = z.object({
  property_id: z.number().int().positive(),
  image_url: z.string().url().max(255).optional(),
  caption: z.string().max(255).optional(),
  is_primary: z.boolean().default(false).optional(),
});

module.exports = {
  propertyImageSchema,
};
