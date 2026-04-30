const express = require("express");
const mongoose = require("mongoose");
const complaintRoutes = require("./routes/complaint.routes");
const app = express();

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");


const cors = require("cors");
app.use(cors());


app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/fsad_complaints")
  .then(() => {
    console.log("✅ MongoDB connected (Complaint Service)");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });


app.use("/complaints", complaintRoutes);

app.get("/swagger.json", (req, res) => {
  res.json(swaggerSpec);
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.listen(5000, () =>
  console.log("Complaint Service running on port 5000")
);
