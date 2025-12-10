require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))

  .catch((err) => console.log(err));
app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.use("/api/projects", require("./routes/projectRoutes"));

const PORT = process.env.PORT || 5003;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
