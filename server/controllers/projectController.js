const asyncHandler = require("express-async-handler");
const Project = require("../models/ProjectModel");

// @desc    Fetch all projects
// @route   GET /api/projects
// @access  Private
const getProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find({});
  res.json(projects);
});

// @desc    Fetch single project
// @route   GET /api/projects/:id
// @access  Private
const getProjectById = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (project) {
    res.json(project);
  } else {
    res.status(404);
    throw new Error("Project not found");
  }
});

// @desc    Create a project
// @route   POST /api/projects
// @access  Private
const createProject = asyncHandler(async (req, res) => {
  //   use try catch block to handle errors
  try {
    const project = new Project({
      title: req.body.title,
      description: req.body.description,
      keywords: req.body.keywords,
      start_date: req.body.start_date,
      duration: req.body.duration,
      budget: req.body.budget,
      initial_amount: req.body.initial_amount,
      steps: req.body.steps,
      payment_systems: req.body.payment_systems,
      partner_code: req.body.partner_code,
      client_code: req.body.client_code,
    });

    const createdProject = await project.save();
    res.status(201).json(createdProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Update a project
// @route   PUT /api/projects/:id
// @access  Private
const updateProject = asyncHandler(async (req, res) => {
  //   use try catch block to handle errors
  try {
    const project = await Project.findById(req.params.id);

    if (project) {
      project.title = req.body.title || project.title;
      project.description = req.body.description || project.description;
      project.keywords = req.body.keywords || project.keywords;
      project.start_date = req.body.start_date || project.start_date;
      project.duration = req.body.duration || project.duration;
      project.budget = req.body.budget || project.budget;
      project.initial_amount =
        req.body.initial_amount || project.initial_amount;
      project.steps = req.body.steps || project.steps;
      project.payment_systems =
        req.body.payment_systems || project.payment_systems;
      project.partner_code = req.body.partner_code || project.partner_code;
      project.client_code = req.body.client_code || project.client_code;

      const updatedProject = await project.save();
      res.json(updatedProject);
    } else {
      res.status(404);
      throw new Error("Project not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Delete a project
// @route   DELETE /api/projects/:id
// @access  Private
const deleteProject = asyncHandler(async (req, res) => {
  //  use try catch block to handle errors
  try {
    const project = await Project.findById(req.params.id);

    if (project) {
      await Project.findByIdAndDelete(req.params.id);
      res.json({ message: "Project removed" });
    } else {
      res.status(404);
      throw new Error("Project not found");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
};
