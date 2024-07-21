const express = require("express");
const router = express.Router();
const {
  getNotifications,
  getNotificationById,
  createNotification,
  updateNotification,
  deleteNotification,
} = require("../controllers/notificationController");
const { protect } = require("../middleware/authMiddleware");
router.route("/").get(getNotifications).post(protect, createNotification);
router
  .route("/:id")
  .get(getNotificationById)
  .put(protect, updateNotification)
  .delete(protect, deleteNotification);

module.exports = router;
