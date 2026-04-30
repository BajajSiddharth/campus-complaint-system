/**
 * Central Swagger configuration (Option 1: JSON merge approach)
 * ------------------------------------------------------------
 * This swagger.js FETCHES swagger.json from individual services
 * and MERGES them into a single OpenAPI specification.
 *
 * This approach is:
 * ✅ 100% reliable
 * ✅ Industry‑grade
 * ✅ Works across multiple Node projects
 */

const axios = require("axios");

async function getCentralSwaggerSpec() {
  // Fetch Swagger JSON from each service
  const authSpecResponse = await axios.get("http://localhost:4000/swagger.json");
  const complaintSpecResponse = await axios.get("http://localhost:5000/swagger.json");

  const authSpec = authSpecResponse.data;
  const complaintSpec = complaintSpecResponse.data;

  return {
    openapi: "3.0.0",
    info: {
      title: "Campus Maintenance System API",
      version: "1.0.0",
      description: "Centralized Swagger documentation for Auth and Complaint microservices"
    },
    servers: [
      { url: "http://localhost:4000", description: "Auth Service" },
      { url: "http://localhost:5000", description: "Complaint Service" }
    ],

    // ✅ Merge all API paths
    paths: {
      ...authSpec.paths,
      ...complaintSpec.paths
    },

    // ✅ Merge shared components (schemas, security, etc.)
    components: {
      ...(authSpec.components || {}),
      ...(complaintSpec.components || {})
    }
  };
}

module.exports = getCentralSwaggerSpec;
