const { z } = require("zod");

const propertySchema = z.object({
  user_id: z.number().int().positive(),
  property_type_id: z.number().int().positive(),
  title: z.string().max(100).optional(),
  description: z.string().optional(),
  type: z.enum(["apartment", "house", "building"]).nullable(),
  icon: z.string().nullable(),
  price: z.number().nonnegative().optional(),
  address: z.string().max(255).optional(),
  city: z.string().max(100).optional(),
  state: z.string().max(100).optional(),
  zip_code: z.string().max(20).optional(),
  bedrooms: z.number().int().nonnegative().optional(),
  bathrooms: z.number().int().nonnegative().optional(),
  area_sqft: z.number().int().nonnegative().optional(),
  status: z
    .enum(["for_sale", "for_rent", "sold", "rented"])
    .optional()
    .default("for_sale"),
  is_active: z.boolean().optional(),
});

module.exports = { propertySchema };
