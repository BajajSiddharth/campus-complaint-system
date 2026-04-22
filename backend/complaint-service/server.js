const express = require("express");
const mongoose = require("mongoose");
const complaintRoutes = require("./routes/complaint.routes");

const app = express();
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/fsad_complaints");

app.use("/complaints", complaintRoutes);

app.listen(5000, () =>
  console.log("Complaint Service running on port 5000")
);
