const express = require("express");
const ctrlStory = require("../controllers/story");

const router = express.Router();

// Create a new story
router.post("/", ctrlStory.addStory);

// Get all stories
router.get("/", ctrlStory.getAllStory);

// Search for stories based on query parameters
router.get("/search", ctrlStory.searchStory);

// Get a story by ID
router.get("/:_id", ctrlStory.getStory);

// Update a story by ID
router.put("/:_id", ctrlStory.updateStory);

// Delete a story by ID
router.delete("/:_id", ctrlStory.deleteStory);

module.exports = router;
