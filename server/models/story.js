const mongoose = require("mongoose");

const storySchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String },
  author: { type: mongoose.Types.ObjectId, ref: "Author", require: true },
  description: { type: String, default: "" },
  content: { type: String, default: "" },
  genres: [{ type: mongoose.Types.ObjectId, ref: "Genre", require: true }],
  created_at: { type: Date, default: Date.now },
  image: { type: String },
  status: { type: Boolean },

  rating: { type: Number, min: 0, max: 5, default: 5 },

  chapter: [{ type: mongoose.Types.ObjectId, ref: "Chapter" }],
});

module.exports = mongoose.model("Story", storySchema);
