const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const articleSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  publication_date: {
    type: Date,
    default: Date.now,
  },
  photo: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("Article", articleSchema);
