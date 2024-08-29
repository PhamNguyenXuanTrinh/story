const mongoose = require("mongoose");

const genreSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String},
  description: { type: String },
  story: [{type: mongoose.Types.ObjectId, ref: "Story"}]
});

module.exports = mongoose.model("Genre", genreSchema);