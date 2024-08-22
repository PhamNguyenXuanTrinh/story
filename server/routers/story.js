const ctrlStory = require("../controllers/story");

const express = require("express");

const router = express.Router();
ctrl = require("../controllers/story");
router.post("/", ctrlStory.addStory);
router.get("/", ctrlStory.getAllStory);
router.get("/:_id", ctrlStory.getStory);
router.put("/:_id", ctrlStory.updateStory);
router.delete("/:_id", ctrlStory.deleteStory);
module.exports = router;
