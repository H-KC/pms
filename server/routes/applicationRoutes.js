const express = require("express");
const router = express.Router();

const {
  getApplications,
  getApplicationById,
  createApplication,
  updateApplication,
  deleteApplication,
} = require("../controllers/applicationController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").get(getApplications).post(protect, createApplication);
router
  .route("/:id")
  .get(getApplicationById)
  .put(protect, updateApplication)
  .delete(protect, deleteApplication);

module.exports = router;
