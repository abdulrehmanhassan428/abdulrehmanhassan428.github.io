require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

// ------------------ MongoDB Connection ------------------
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB error:", err));

// ------------------ Schema & Model ------------------
const packageSchema = new mongoose.Schema({
  packageId: {
    type: String,
    required: true,
    unique: true
  },
  packageName: String,
  destination: String,
  duration: String,
  description: String
});

const Package = mongoose.model("Package", packageSchema);

// ------------------ Routes ------------------

// Test route
app.get("/", (req, res) => {
  res.send("Travel Packages API is running");
});

// GET all packages  (same as readPackages)
app.get("/packages", async (req, res) => {
  try {
    const packages = await Package.find();
    res.json(packages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET single package by ID
app.get("/package/:id", async (req, res) => {
  try {
    const pkg = await Package.findOne({ packageId: req.params.id });

    if (!pkg) {
      return res.status(404).json({ message: "Package not found" });
    }

    res.json(pkg);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST create new package
app.post("/package/:id", async (req, res) => {
  try {
    const newPackage = await Package.create({
      packageId: req.params.id,
      packageName: req.body.packageName,
      destination: req.body.destination,
      duration: req.body.duration,
      description: req.body.description
    });

    res.status(201).json({
      message: "Package created successfully",
      package: newPackage
    });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ------------------ Server ------------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// For Vercel
module.exports = app;
