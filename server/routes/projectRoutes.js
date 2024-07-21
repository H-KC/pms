const express = require("express");
const router = express.Router();

const {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  getMyProjects,
} = require("../controllers/projectController");

const { protect } = require("../middleware/authMiddleware");

router.route("/").get(getProjects).post(protect, createProject);
router.route("/my/:id").get(getMyProjects);
router
  .route("/:id")
  .get(getProjectById)
  .put(protect, updateProject)
  .delete(protect, deleteProject);

module.exports = router;
