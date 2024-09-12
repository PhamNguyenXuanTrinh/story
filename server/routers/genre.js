const ctrlGenre = require("../controllers/genre");

const express = require("express");

const router = express.Router();
router.post("/", ctrlGenre.addGenre);
router.get("/", ctrlGenre.getGenre);
router.get("/:slug", ctrlGenre.getOneGenre);
router.put("/:_id", ctrlGenre.updateGenre);
router.delete("/:_id", ctrlGenre.deleteGenre);
module.exports = router;
