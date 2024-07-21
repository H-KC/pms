const asyncHandler = require("express-async-handler");
const Application = require("../models/ApplicationModel");
const User = require("../models/UserModel");

// @desc    Fetch all applications
// @route   GET /api/applications
// @access  Private
const getApplications = asyncHandler(async (req, res) => {
  const applications = await Application.find({});
  res.json(applications);
});

// @desc    Fetch single application
// @route   GET /api/applications/:id
// @access  Private
const getApplicationById = asyncHandler(async (req, res) => {
  const application = await Application.findById(req.params.id);

  if (application) {
    res.json(application);
  } else {
    res.status(404);
    throw new Error("Application not found");
  }
});

// @desc    Create an application
// @route   POST /api/applications
// @access  Private
const createApplication = asyncHandler(async (req, res) => {
  const application = new Application({
    user: req.body.user,
  });

  const createdApplication = await application.save();
  res.status(201).json(createdApplication);
});

// @desc    Update an application
// @route   PUT /api/applications/:id
// @access  Private
const updateApplication = asyncHandler(async (req, res) => {
  const application = await Application.findById(req.params.id);

  if (application) {
    application.user = req.body.user || application.user;
    application.status = req.body.status || application.status;

    const updatedApplication = await application.save();
    // modfy the user role to application.status
    const user = await User.findById(updatedApplication.user);
    user.role = "partner";
    await user.save();
    res.json(updatedApplication);
  } else {
    res.status(404);
    throw new Error("Application not found");
  }
});

// @desc    Delete an application
// @route   DELETE /api/applications/:id
// @access  Private
const deleteApplication = asyncHandler(async (req, res) => {
  const application = await Application.findById(req.params.id);

  if (application) {
    await Application.findByIdAndDelete(req.params.id);
    res.json({ message: "Application removed" });
  } else {
    res.status(404);
    throw new Error("Application not found");
  }
});

module.exports = {
  getApplications,
  getApplicationById,
  createApplication,
  updateApplication,
  deleteApplication,
};
