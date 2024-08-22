const ctrlChapter = require("../controllers/chapter");
const express = require("express");
const router = express.Router();


router.post("/", ctrlChapter.addChapter);
router.get('/:_id', ctrlChapter.getChapter)
router.get('/', ctrlChapter.getAllChapters)
router.put('/:_id', ctrlChapter.updateChapter)
router.delete('/:_id', ctrlChapter.deleteChapter)
module.exports = router;
