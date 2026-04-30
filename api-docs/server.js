const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");
const cors = require("cors");

const app = express();
app.use(cors());

console.log("Swagger paths:", swaggerSpec.paths);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(3001, () => {
  console.log("✅ Central Swagger running at http://localhost:3001/api-docs");
});
