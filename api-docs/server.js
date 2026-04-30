const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");
const cors = require("cors");

const app = express();

// Allow browser access
app.use(cors());

// Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Health check (optional but nice)
app.get("/", (req, res) => {
  res.send("Central Swagger API Documentation");
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`✅ Central Swagger running at http://localhost:${PORT}/api-docs`);
});
