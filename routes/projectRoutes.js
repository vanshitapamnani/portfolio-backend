const express = require("express");
const router = express.Router();
const Project = require("../models/Project");

router.delete("/test", (req, res) => {
  res.json({ message: "DELETE route works" });
});

router.post("/", async (req, res) => {
  try {
    const { img, title, role, info, link, stage, progress } = req.body;

    const newProject = new Project({
      img,
      title,
      role,
      info,
      link,
      // stage: stage || "Completed",
      // progress: stage === "Completed" ? 100 : progress || 50,
      stage,
      progress,
    });

    await newProject.save();

    res
      .status(201)
      .json({ message: "Project added successfully", project: newProject });
  } catch (error) {
    res.status(500).json({ message: "Error creating project", error });
  }
});

router.get("/", async (req, res) => {
  console.log("Received DELETE request for id:", req.params.id);
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ message: "ERROR IN FETCHING PROJECTS", err });
  }
});

// router.delete("/:id", async (req, res) => {
//   console.log("🔥 DELETE ROUTE HIT");
//   console.log("ID:", req.params.id);
//   return res.status(200).json({ message: "DELETE route works" });
// });
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProject = await Project.findByIdAndDelete(id);
    if (!deletedProject) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json({ message: "Project deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error in deleting project", error });
  }
});

module.exports = router;
