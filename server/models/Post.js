const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  desc: { type: String, required: true },
  text: { type: String, required: true },
  tags: { type: Array, default: [] },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  image: { type: String },
});

module.exports = mongoose.model("Post", PostSchema);
