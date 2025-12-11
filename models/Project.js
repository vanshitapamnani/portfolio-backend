const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  img: { type: String },
  title: String,
  role: String,
  info: String,
  link: String,
  stage: { type: String, default: "In-Progress" },
  progress: { type: Number, default: 0 },
});

module.exports = mongoose.model("Project", projectSchema);
