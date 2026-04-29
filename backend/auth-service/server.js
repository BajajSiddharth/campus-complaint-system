const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth.routes");

const app = express();
app.use(express.json());

const cors = require("cors");
app.use(cors());

mongoose.connect("mongodb://localhost:27017/fsad_auth");

app.use("/auth", authRoutes);

app.listen(4000, () =>
  console.log("Auth Service running on port 4000")
);
