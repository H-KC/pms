const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const applicationSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },

  status: {
    type: String,
    default: "pending",
  },
  application_date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Application", applicationSchema);
