const express = require("express");
const router = express.Router();
const Project = require("../models/Project");
require("dotenv").config();

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

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { img, title, role, info, link, stage, progress } = req.body;

    //find project by ID and update it
    const updatedProject = await Project.findByIdAndUpdate(
      id,
      { img, title, role, info, link, stage, progress },
      { new: true },
    );
    if (!updatedProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json({
      message: "Project updated successfully",
      project: updatedProject,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating project", error });
  }
});

router.post("/verify", (req, res) => {
  try {
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ message: "Password required" });
    }
    if (!process.env.ADMIN_PASSWORD) {
      return res
        .status(500)
        .json({ message: "ADMIN_PASSWORD not set on server" });
    }

    if (password.trim() === process.env.ADMIN_PASSWORD.trim()) {
      return res.status(200).json({ success: true });
    }

    return res
      .status(401)
      .json({ success: false, message: "Invalid Password" });
  } catch (err) {
    console.error("VERIFY ERROR:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
