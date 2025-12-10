const express = require("express");
const router = express.Router();
const Project = require("../models/Project");

router.post("/", async (req, res) => {
  try {
    const { img, title, role, info, link } = req.body;

    const newProject = new Project({
      img,
      title,
      role,
      info,
      link,
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
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ message: "ERROR IN FETCHING PROJECTS", err });
  }
});

module.exports = router;
