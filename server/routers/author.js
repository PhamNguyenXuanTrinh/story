const ctrlAuthor = require("../controllers/author");

const express = require("express");

const router = express.Router();
ctrl = require("../controllers/author");
router.post("/", ctrlAuthor.addAuthor);
router.get('/:_id', ctrlAuthor.getOneAuthor)
router.put('/:_id', ctrlAuthor.updateAuthor)
router.delete('/:_id', ctrlAuthor.deleteAuthor)
module.exports = router;
