const mongoose = require("mongoose");

// Function to capitalize the first letter of each word
const capitalizeWords = (str) => {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

const genreSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String },
  description: { type: String },
  story: [{ type: mongoose.Types.ObjectId, ref: "Story" }]
});

// Pre-save hook to capitalize the name field
genreSchema.pre("save", function (next) {
  if (this.isModified("name")) {
    this.name = capitalizeWords(this.name); // Capitalize the first letter of each word
  }
  next();
});

module.exports = mongoose.model("Genre", genreSchema);
