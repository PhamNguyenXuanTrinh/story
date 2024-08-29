const mongoose = require("mongoose");
const { type } = require("os");

const authorSchema = new mongoose.Schema({
  name: { type: String, require: true, unique: true },
  story: [{ type: mongoose.Types.ObjectId, ref: "Story" }],
  slug: { type: String}
});

module.exports = mongoose.model("Author", authorSchema);
