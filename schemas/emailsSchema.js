const { z } = require("zod");

const emailSchema = z.object({
  subject: z.string(),
  message: z.string(),
  email: z.string(),
  phone: z.string().optional(),
  name: z.string().optional(),
});

module.exports = { emailSchema };
