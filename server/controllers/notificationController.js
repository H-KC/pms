const asyncHandler = require("express-async-handler");
const Notification = require("../models/NotificationModel");

// @desc    Fetch all notifications
// @route   GET /api/notifications
// @access  Private
const getNotifications = asyncHandler(async (req, res) => {
  const notifications = await Notification.find({});
  res.json(notifications);
});

// @desc    Fetch single notification
// @route   GET /api/notifications/:id
// @access  Private
const getNotificationById = asyncHandler(async (req, res) => {
  const notification = await Notification.findById(req.params.id);

  if (notification) {
    res.json(notification);
  } else {
    res.status(404);
    throw new Error("Notification not found");
  }
});

// @desc    Create a notification
// @route   POST /api/notifications
// @access  Private
const createNotification = asyncHandler(async (req, res) => {
  const notification = new Notification({
    user: req.body.user,
    message: req.body.message,
    read: req.body.read,
  });

  const createdNotification = await notification.save();
  res.status(201).json(createdNotification);
});

// @desc    Update a notification
// @route   PUT /api/notifications/:id
// @access  Private
const updateNotification = asyncHandler(async (req, res) => {
  const notification = await Notification.findById(req.params.id);

  if (notification) {
    notification.user = req.body.user || notification.user;
    notification.message = req.body.message || notification.message;
    notification.read = req.body.read || notification.read;

    const updatedNotification = await notification.save();
    res.json(updatedNotification);
  } else {
    res.status(404);
    throw new Error("Notification not found");
  }
});

// @desc    Delete a notification
// @route   DELETE /api/notifications/:id
// @access  Private
const deleteNotification = asyncHandler(async (req, res) => {
  const notification = await Notification.findById(req.params.id);

  if (notification) {
    await notification.remove();
    res.json({ message: "Notification removed" });
  } else {
    res.status(404);
    throw new Error("Notification not found");
  }
});

module.exports = {
  getNotifications,
  getNotificationById,
  createNotification,
  updateNotification,
  deleteNotification,
};
