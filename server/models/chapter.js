const mongoose = require("mongoose");

const chapterSchema = new mongoose.Schema({
  story: { type: mongoose.Types.ObjectId, ref: "Story"}, 
  slug: { type: String},
  title: { type: String },
  content: { type: String},
  chapterNumber: { type: Number, required: true }, 
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Chapter", chapterSchema);