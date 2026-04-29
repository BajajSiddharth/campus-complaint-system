const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth.routes");

const app = express();
app.use(express.json());

const cors = require("cors");
app.use(cors());

mongoose
  .connect("mongodb://127.0.0.1:27017/fsad_auth")
  .then(() => {
    console.log("✅ MongoDB connected (Auth Service)");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });


app.use("/auth", authRoutes);

app.listen(4000, () =>
  console.log("Auth Service running on port 4000")
);
