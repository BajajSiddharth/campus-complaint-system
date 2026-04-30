const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0", // Changed 'swagger' to 'openapi' (standard for 3.0)
    info: {
      title: "Campus Maintenance System API",
      version: "1.0.0",
      description: "Combined API documentation for Auth and Complaint services",
    },
    servers: [
      { url: "http://localhost:4000", description: "Auth Service" },
      { url: "http://localhost:5000", description: "Complaint Service" },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  
  apis: [
      path.join(__dirname, "../auth-service/routes/*.js"),
      path.join(__dirname, "../complaint-service/routes/*.js")
    ]

};

module.exports = swaggerJsdoc(options);
