const mongoose = require("mongoose");

const storySchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: mongoose.Types.ObjectId, ref: "Author" }, 
  description: { type: String },
  content: { type: String },
  genre: [{ type: mongoose.Types.ObjectId, ref: "Genre" }], 
  created_at: { type: Date, default: Date.now },
  status: { type: Boolean },
  vote: {
    rating: { type: Number, min: 0, max: 5 }, 
    default: 5,
  },
});

module.exports = mongoose.model("Story", storySchema);