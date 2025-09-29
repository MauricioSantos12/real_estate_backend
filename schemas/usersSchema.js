const { z } = require("zod");

const userSchema = z.object({
  name: z.string().max(100),
  email: z.string().email().max(100),
  is_anonymous: z.boolean(),
  is_active: z.boolean(),
  role: z.enum(["admin", "agent", "customer"]),
});

const userUpdateSchema = z.object({
  name: z.string().max(100).optional(),
  email: z.string().email().max(100).optional(),
  is_anonymous: z.boolean().optional(),
  is_active: z.boolean().optional(),
});
const idSchema = z
  .string()
  .regex(/^\d+$/, "ID must be a positive integer")
  .transform(Number);

module.exports = {
  userSchema,
  idSchema,
  userUpdateSchema,
};
