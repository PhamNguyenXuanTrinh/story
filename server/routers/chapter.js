const ctrlChapter = require("../controllers/chapter");
const express = require("express");
const router = express.Router();

router.post("/", ctrlChapter.addChapter);
router.get("/all/:_id", ctrlChapter.getAllChapters);
router.get("/:_id", ctrlChapter.getChapter);
router.put("/:_id", ctrlChapter.updateChapter);
router.delete("/:_id", ctrlChapter.deleteChapter);
module.exports = router;
