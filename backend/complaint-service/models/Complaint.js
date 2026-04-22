const mongoose = require("mongoose");

const ComplaintSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  priority: String,
  location: String,
  status: { type: String, default: "OPEN" },
  createdBy: String,
  assignedTo: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Complaint", ComplaintSchema);
