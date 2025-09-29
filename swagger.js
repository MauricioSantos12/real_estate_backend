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
