const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  img: String,
  title: String,
  role: String,
  info: String,
  link: String,
});

module.exports = mongoose.model("Project", projectSchema);
