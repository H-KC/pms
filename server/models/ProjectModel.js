const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const projectSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  keywords: {
    type: [String],
    required: true,
  },
  start_date: {
    type: Date,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  budget: {
    type: Number,
    required: true,
  },
  initial_amount: {
    type: Number,
    required: true,
  },
  steps: {
    type: [String],
    required: true,
  },
  payment_systems: {
    type: [String],
    required: true,
  },
  partner_code: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    required: true,
  },
  client_code: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});
module.exports = mongoose.model("Project", projectSchema);

