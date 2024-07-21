const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const notificationSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  message: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "unread",
  },
  notification_date: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("Notification", notificationSchema);
