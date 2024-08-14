const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  biography: { type: String },
  date_of_birth: { type: Date },
  books: [{ type: mongoose.Types.ObjectId, ref: "Story" }],
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Author", authorSchema);