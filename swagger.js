const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
require("dotenv").config();
const PORT = process.env.PORT || 5000;
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Real Estate API",
      version: "1.0.0",
      description: "API documentation for Real Estate project",
    },
    components: {
      schemas: {
        Property: {
          type: "object",
          properties: {
            user_id: { type: "integer", example: 1 },
            property_type_id: { type: "integer", example: 1 },
            title: { type: "string", example: "Modern Apartment" },
            description: {
              type: "string",
              example: "A cozy apartment downtown",
            },
            type: { type: "string", enum: ["apartment", "house", "building"] },
            icon: { type: "string", example: "🏠" },
            price: { type: "number", example: 250000 },
            address: { type: "string", example: "123 Main St" },
            city: { type: "string", example: "New York" },
            state: { type: "string", example: "NY" },
            zip_code: { type: "string", example: "10001" },
            bedrooms: { type: "integer", example: 3 },
            bathrooms: { type: "integer", example: 2 },
            area_sqft: { type: "integer", example: 1200 },
            status: {
              type: "string",
              enum: ["for_sale", "for_rent", "sold", "rented"],
              example: "for_sale",
            },
            is_active: { type: "boolean", example: true },
          },
          required: ["user_id", "property_type_id"],
        },
      },
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    servers: [
      {
        url: `http://localhost:${PORT}/api`,
      },
    ],
  },
  apis: ["./routes/*.js"], // path to your routes
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = { swaggerUi, swaggerSpec };
