const express = require("express");
const swaggerUi = require("swagger-ui-express");
const cors = require("cors");

const getCentralSwaggerSpec = require("./swagger");

const app = express();
app.use(cors());

(async () => {
  try {
    const swaggerSpec = await getCentralSwaggerSpec();

    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    app.listen(3001, () => {
      console.log("✅ Central Swagger running at http://localhost:3001/api-docs");
    });
  } catch (err) {
    console.error("❌ Failed to load Swagger specs:", err.message);
  }
})();
