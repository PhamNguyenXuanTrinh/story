const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema({
  name: { type: String, require: true, unique: true },
  books: [{ type: mongoose.Types.ObjectId, ref: "Story" }],
});

module.exports = mongoose.model("Author", authorSchema);
