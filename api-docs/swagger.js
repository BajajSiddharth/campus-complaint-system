const swaggerJsdoc = require("swagger-jsdoc");
const path = require("path");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Campus Maintenance System API",
      version: "1.0.0",
      description: "Centralized API documentation for all microservices"
    },
    servers: [
      { url: "http://localhost:4000", description: "Auth Service" },
      { url: "http://localhost:5000", description: "Complaint Service" }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    }
  },

  // ✅ ABSOLUTE PATHS — this fixes 99% of issues
  apis: [
    path.resolve(__dirname, "../auth-service/routes/auth.routes.js"),
    path.resolve(__dirname, "../complaint-service/routes/complaint.routes.js")
  ]
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
``
